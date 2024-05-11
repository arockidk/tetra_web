import init, * as tet from "/scripts/pkg/rust_tetro.js";
class MinoGrid {
    _minos;
    _sprites;
    _minoTexture;
    _width;
    get width() {
        return this._width;
    }
    set width(v) {
        this._width = v;
    }
    _height;
    get height() {
        return this._height;
    }
    set height(v) {
        this._height = v;
    }
    _minoHeight;
    get minoHeight() {
        return this._minoHeight;
    }
    set minoHeight(v) {
        this._minoHeight = v;
    }
    _minoWidth;
    get minoWidth() {
        return this._minoWidth;
    }
    set minoWidth(v) {
        this._minoWidth = v;
    }
    _canvas;
    get canvas() {
        return this._canvas;
    }
    set canvas(v) {
        this._canvas = v;
    }
    _renderer;
    getRenderer() {
        return this._renderer;
    }
    async setRenderer(v) {
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
    _container;
    get container() {
        return this._container;
    }
    set container(v) {
        this._container = v;
    }
    preRender() {
    }
    update(field) {
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
                let piece = field.getActivePiece();
                let color = piece.color;
                let minos = piece.getMinos();
                for (let i = 0; i < 4; i++) {
                    let pos = minos[i];
                    let x = pos[0];
                    let y = pos[1];
                    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
                        continue;
                    }
                    this._minos[19 - y][x] = color;
                    console.log(this._minos);
                    this._sprites[19 - y][x].texture = this._minoTexture.textures[tet.pieceColorToChar(tet.pieceColorFromInt(this._minos[19 - y][x]))];
                }
            }
            ;
        }
        field.activeChanged = false;
    }
    render() {
        if (this._canvas === undefined || this._renderer === undefined) {
            return;
        }
        this.preRender();
        this._renderer.render(this._container);
    }
    constructor(height, width, minoTexture) {
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
    _field;
    changed;
    holdChanged;
    activeChanged;
    get field() {
        return this._field;
    }
    set field(v) {
        this._field = v;
    }
    constructor(field) {
        this._field = field ?? new tet.Field(new tet.TetBoard());
        this.changed = [];
        this.activeChanged = false;
        this.holdChanged = false;
    }
    dasPiece(dir) {
        this.field.dasPiece(dir);
    }
    rotatePiece(dir) {
        this.field.rotatePiece(dir);
    }
    setTile(x, y, v) {
        this.field.setTile(x, y, v);
        this.changed.push(x + (19 - y) * 10);
    }
    getTile(x, y) {
        return this.field.getTile(x, y);
    }
    getActivePiece() {
        return this.field.active_piece;
    }
    setActivePiece(piece) {
        this._field.active_piece = piece;
        this.activeChanged = true;
    }
    getHold() {
        return this.field.hold;
    }
    setHold(piece) {
        this.field.hold = piece;
        this.holdChanged = true;
    }
}
function update(game) {
    game.fieldGrid.update(game.field);
    game.fieldGrid.render();
}
async function run() {
    await init();
    let minoSheet = await PIXI.Assets.load("assets/skin_sheet.json");
    let renderer = new PIXI.WebGLRenderer();
    let field = new FieldWrapper();
    let fieldGrid = new MinoGrid(20, 10, minoSheet);
    minoSheet.textures['Z'];
    await fieldGrid.setRenderer(renderer);
    let game = {
        field: field,
        fieldGrid: fieldGrid
    };
    globalThis.__PIXI_STAGE__ = game.fieldGrid.container;
    globalThis.__PIXI_RENDERER__ = renderer;
    globalThis.game = game;
    globalThis.tet = tet;
    document.body.appendChild(renderer.canvas);
    setInterval(() => {
        update(game);
    }, 60);
}
run();
//# sourceMappingURL=main.js.map