
import init, * as tet from "/scripts/pkg/rust_tetro.js"

interface MinoRenderInfo {
    height: number;
    width: number;
    texture: HTMLImageElement;
    borderColor: string;
    borderWidth: number;
}
class MinoGrid {
    private _minos: tet.PieceColor[][];
    private _sprites: PIXI.Sprite[][];
    private _minoTexture: PIXI.Spritesheet;
    private _width : number;
    public get width() : number {
        return this._width;
    }
    public set width(v : number) {
        this._width = v;
    }

    private _height : number;
    public get height() : number {
        return this._height;
    }
    public set height(v : number) {
        this._height = v;
    }
    
    private _minoHeight : number;
    public get minoHeight() : number {
        return this._minoHeight;
    }
    public set minoHeight(v : number) {
        this._minoHeight = v;
    }
    
    private _minoWidth : number;
    public get minoWidth() : number {
        return this._minoWidth;
    }
    public set minoWidth(v : number) {
        this._minoWidth = v;
    }
    
    
    private _canvas? : HTMLCanvasElement;
    public get canvas() : HTMLCanvasElement | undefined {
        return this._canvas;
    }
    private set canvas(v : HTMLCanvasElement | undefined) {
        this._canvas = v;
    }
    
    private _renderer? : PIXI.Renderer;
    public getRenderer() : PIXI.Renderer | undefined {
        return this._renderer;
    }
    public async setRenderer(v : PIXI.Renderer | undefined) {
        this._renderer = v;
        if (this._renderer === undefined) {
            return;
        }
        await this._renderer.init({
            "backgroundColor": "0xbbedf2",
            "height": this.height * this.minoHeight,
            "width": this.width * this.minoWidth
        });
    }
    
    private _container : PIXI.Container;
    public get container() : PIXI.Container {
        return this._container;
    }
    public set container(v : PIXI.Container) {
        this._container = v;
    }
    public preRender() {
        
    }
    public update(field: FieldWrapper) {
        // console.log(field.board.getTile(0, 0));
        // console.log(tet.pieceColorToChar(this._minos[0][0]))
        // console.log(this._sprites[0][0].width)
        for (let changed of field.changed) {
            let y = Math.floor((190 - changed) / 10);
            let x = changed % 10;
            this._minos[19 - y][x] = field.getTile(x, y);
            
            this._sprites[19 - y][x].texture = this._minoTexture.textures[tet.pieceColorToChar(this._minos[19 - y][x])];
        }
        field.changed = [];
        if (field.activeChanged) {
            if (field.getActivePiece() !== undefined) {
                let piece = <tet.TetPiece> field.getActivePiece(); 
                let color = piece.color;
                let minos: tet.Vec2[] = piece.getMinos();
                
                for (let i = 0; i < 4; i++) { 
                    let pos = minos[i];
                    let x = pos[0];
                    let y = pos[1];
                    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
                        continue;
                    }

                    this._minos[19 - y][x] = color;
                    console.log(this._minos);
                    this._sprites[19 - y][x].texture = this._minoTexture.textures[
                        tet.pieceColorToChar(
                            tet.pieceColorFromInt(this._minos[19 - y][x])
                        )
                    ];
                }
            };
           
        }
        field.activeChanged = false;
        
    }
    public render() {
        if (this._canvas === undefined || this._renderer === undefined) {
            return;
        }
        this.preRender();
        this._renderer.render(this._container);
    }
    public constructor(height: number, width: number, minoTexture: PIXI.Spritesheet) {
        this._height = height;
        this._width = width;
        this._minos = new Array(height).fill(0).map(() => new Array(width).fill(0));
        this._minoHeight = 32;
        this._minoWidth = 32;
        this._minoTexture = minoTexture;
        this._canvas = document.createElement('canvas');
        this._container = new PIXI.Container();
        this._sprites = new Array(height).fill(0).map((v, i) => {
            let row = new PIXI.Container();
            row.label = i.toString();
            let ret = new Array(width).fill(0).map((v, j) => {
                let sprite = new PIXI.Sprite();
                sprite.x = j * this.minoWidth;
                sprite.y = i * this.minoHeight;
                sprite.texture = this._minoTexture.textures[tet.pieceColorToChar(this._minos[i][j])];
                row.addChild(sprite);
                
                return sprite;
            });

            this._container.addChild(row);
            return ret;
        });
    }
    

    

}
class FieldWrapper {

    private _field: tet.Field;
    public changed: number[];
    public holdChanged: boolean;
    public activeChanged: boolean;
    public get field() : tet.Field {
        return this._field;
    }
    public set field(v : tet.Field) {
        this._field = v;
    }
    constructor(field?: tet.Field) {
        this._field = field ?? new tet.Field(new tet.TetBoard());
        this.changed = [];
        this.activeChanged = false;
        this.holdChanged = false;
    }
    public dasPiece(dir: tet.Direction) {
        this.field.dasPiece(dir);
    }
    public rotatePiece(dir: tet.Direction) {
        this.field.rotatePiece(dir);
    }
    public setTile(x: number, y: number, v: number) {
        this.field.setTile(x, y, v);
        this.changed.push(x + (19 - y) * 10);
    }
    public getTile(x: number, y: number): number {
        return this.field.getTile(x, y);
    }
    public getActivePiece() : tet.TetPiece | undefined {
        return this.field.active_piece;
    }
    public setActivePiece(piece: tet.TetPiece | undefined) {
        this._field.active_piece = piece;
        this.activeChanged = true;
       
    }
    public getHold() : tet.TetPiece | undefined {
        return this.field.hold;
    }
    public setHold(piece: tet.TetPiece | undefined) {
        this.field.hold = piece;
        this.holdChanged = true;
    }
} 
interface Game {
    field: FieldWrapper;
    fieldGrid: MinoGrid;
    
}
function update(game: Game) {
    game.fieldGrid.update(game.field);
    game.fieldGrid.render();
}

async function run() {
    

    await init();
    let minoSheet: PIXI.Spritesheet = await PIXI.Assets.load("assets/skin_sheet.json");
    let renderer = new PIXI.WebGLRenderer();
    
    let field = new FieldWrapper();
    let fieldGrid = new MinoGrid(20, 10, minoSheet);
    minoSheet.textures['Z']
    await fieldGrid.setRenderer(renderer);
    let game = {
        field: field,
        fieldGrid: fieldGrid
    };
    (globalThis as any).__PIXI_STAGE__ = game.fieldGrid.container;
    (globalThis as any).__PIXI_RENDERER__ = renderer;
    (globalThis as any).game = game;
    (globalThis as any).tet = tet;
    document.body.appendChild(renderer.canvas);
    
    setInterval(() => {
        update(game)
    }, 60);


}
run();