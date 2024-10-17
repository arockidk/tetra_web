
import { accessibilityTarget } from "pixi.js";
import init, * as tet from "./pkg/rust_tetro.js";
import { container } from "webpack";
import { createTextSpanFromBounds } from "typescript";
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1 && document.activeElement?.tagName !== "INPUT") {
        // console.log(this.document.activeElement?.tagName);
        e.preventDefault();
    }
});
interface MinoRenderInfo {
    height: number;
    width: number;
    texture: HTMLImageElement;
    borderColor: string;
    borderWidth: number;
}
let TILE_COLOR_MAP = [
    "B",
    "I",
    "L",
    "O",
    "Z",
    "T",
    "J",
    "S",
    "G"
]
// let TILE_COLOR_MAP = {
//     "B": 0,
//     "I": 1,
//     "L": 2,
//     "O": 3,
//     "Z": 4,
//     "T": 5,
//     "J": 6,
//     "S": 7,
//     "G": 8
// }
class MinoGrid {
    // #region Properties
    private _minos: tet.PieceColor[][];

    private _minoTexture: PIXI.Spritesheet;
    private _scale : number;
    public sprites: PIXI.Sprite[][];
    public get scale() : number {
        return this._scale;
    }
    public set scale(v : number) {
        this._scale = v;
    }
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
    
    

    
    
    private _container : PIXI.Container;
    public get container() : PIXI.Container {
        return this._container;
    }
    public set container(v : PIXI.Container) {
        this._container = v;
    }
    public getSprite(x: number, y: number): PIXI.Sprite {
        return this.sprites[y][x];
    }
    public setSprite(x: number, y: number, new_sprite: PIXI.Sprite) {
        this.sprites[y][x] = new_sprite;
    }

    // #endregion
    public preRender() {
        
    }
    public update(field: FieldWrapper) {
        for (let i = 0; i < 200; i++) {
            let y = Math.floor((199 - i) / 10);
            let x = i % 10;

            this._minos[19 - y][x] = field.getTile(x, y);
            
            // console.log(tet.pieceColorToChar(this._minos[19 - y][x]));
            
            this.sprites[19 - y][x].texture = this._minoTexture.textures[
                tet.pieceColorToChar(this._minos[19 - y][x]).replace("X", "G")
            ];
            this.sprites[19 - y][x].alpha = 1;
           
        }
        // console.log(tet.pieceColorToChar(this._minos[1][5]).replace("X", "G")); 
        // console.log(tet.pieceColorToChar(8).replace("X", "G")); 

        
    }
    public updateActive(field: FieldWrapper) {
        if (field.getActivePiece() !== undefined) {
            let piece = field.getActivePiece() as tet.TetPiece; 
            let color = piece.color;
            let minos: tet.Vec2[] = piece.getMinos();
            // console.log(minos);
            for (let i = 0; i < 4; i++) { 
                let pos = minos[i];
                let x = pos[0];
                let y = pos[1];
                if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
                    continue;
                }

                this.sprites[19 - y][x].texture = this._minoTexture.textures[
                    tet.pieceColorToChar(color)
                ];
                this.sprites[19 - y][x].alpha = 1;
            }
        };
    }
    public constructor(
        height: number, 
        width: number, 
        scale: number,
        minoTexture: PIXI.Spritesheet,
        offsetX: number = 0,
        offsetY: number = 1

    ) {
        this._height = height;
        this._width = width;
        this._minos = new Array(height).fill(0).map(() => new Array(width).fill(0));
        this._minoHeight = 32;
        this._minoWidth = 32;
        this._minoTexture = minoTexture;
        this._container = new PIXI.Container();
        this._container.position.x = offsetX;
        this._container.position.y = offsetY;
        this._container.scale.set(scale);
        
        this._scale = scale;
        this.sprites = new Array(height).fill(0).map((v, i) => {
            let row = new PIXI.Container();
            row.label = i.toString();
            let ret = new Array(width).fill(0).map((v, j) => {
                let sprite = new PIXI.Sprite();
                sprite.x = j * this.minoWidth;
                sprite.y = i * this.minoHeight;
                sprite.texture = this._minoTexture.textures[tet.pieceColorToChar(this._minos[i][j])];
                sprite.label = `${j},${i}, ${j + i*10}`
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
    public get field() : tet.Field {
        return this._field;
    }
    public set field(v : tet.Field) {
        this._field = v;
    }
    constructor(field?: tet.Field) {
        this._field = field ?? new tet.Field(new tet.TetBoard());
    }
    private getPieceChanges(): number[] {
        let changed = [];
        for (let mino of this.field.active_piece?.getMinos() ?? []) {
            let idx = mino[0] + (19 - mino[1]) * 10;
            if (idx < 0 || idx >= 200) {
                continue;                
            }
            changed.push(mino[0] + (19 - mino[1]) * 10);
        }
        return changed;
    }
    public fill(blX: number, blY: number, width: number, height: number, c: tet.PieceColor) {
        for (let y = blY; y < blY + height; y++) {
            for (let x = blX; x < blX + width; x++) {
                this.field.setTile(x, y, c);
            }
        }
    }
    public dasPiece(dir: tet.Direction, amount: number) {
        this.field.dasPiece(dir, amount);
    }
    public rotatePiece(dir: number) {
        if (this.field.active_piece?.color == tet.PieceColor.O) {
            return;
        }
        this.field.rotatePiece(dir);
    }
    public setTile(x: number, y: number, v: number) {
        this.field.setTile(x, y, v);
    }
    public getTile(x: number, y: number): number {
        return this.field.getTile(x, y);
    }
    public getActivePiece() : tet.TetPiece | undefined {
        return this.field.active_piece;
    }
    public setActivePiece(piece: tet.TetPiece | undefined) {
        this._field.active_piece = piece;
    }
    public applyGravity(force: number): boolean {
        let res = this.field.applyGravity(force);
        return res;
    }
    public moveLeft(amount: number): boolean {
        let res = this.field.moveLeft(amount);
        return res;
    }
    public moveRight(amount: number): boolean {
        let res = this.field.moveRight(amount);
        return res;
    }
    public getHold() : tet.TetPiece | undefined {
        return this.field.hold;
    }
    public setHold(piece: tet.TetPiece | undefined) {
        this.field.hold = piece;
    }
    public placeActivePiece(): boolean {
        if (this._field.active_piece) {
            for (let mino of this._field.active_piece.getMinos()) {
                if (mino[1] > 23) { 
                    return false;
                }
            }
        }
        return this._field.place_active_piece();
    }
    public placeNClearActivePiece(): tet.ClearStruct {
        return this._field.place_n_clear_active_piece();
    }
    public checkPC(): boolean {
        return this._field.checkPC();
    }
    public checkTSpin(): tet.TSpinResult {
        return this._field.checkTSpin();
    }
} 
class PieceDisplay {
    private sprites: PIXI.Sprite[][]
    private _piece? : tet.PieceColor;
    private _container : PIXI.Container;
    private _skin : PIXI.Spritesheet;
    
    
    public get offsetX() : number {
        return this._offsetX;
    }
    public set offsetX(v : number) {
        this._container.x -= this.offsetX;
        this._container.x += v;
        this._offsetX = v;
    }
    public get offsetY() : number {
        return this._offsetY;
    }
    public set offsetY(v : number) {
        this._container.y -= this.offsetY;
        this._container.y += v;
        this._offsetY = v;
    }
    public get scale() : number {
        return this._scale;
    }
    public set scale(v : number) {
        let old = this._scale
        this._scale = v;
        for (let row of this.sprites) {
            for (let sprite of row) {
                sprite.x *= v/old;
                sprite.y *= v/old;
                sprite.scale = v;
            }
        }
        this._offsetX *= v/old;
        this._offsetY *= v/old;
    }
    
    public get container() : PIXI.Container {
        return this._container;
    }
    public get piece() : tet.PieceColor | undefined {
        return this._piece;
    }
    public set piece(v : tet.PieceColor | undefined) {
        this._piece = v;
        for (let row of this.sprites) {
            for (let sprite of row) {
                
                sprite.texture = PIXI.Texture.EMPTY;
            }
        }
        if (v) {
            let minos = (new tet.TetPiece(v, tet.Direction.North, new tet.Vec2(0,0))).getRawMinos() ;
            for (let mino of minos) {
                this.sprites[-mino[1] + 2][mino[0] + 1].texture = this._skin.textures[tet.pieceColorToChar(v)];
            }
        }

    }
    
    public constructor (

        skin: PIXI.Spritesheet,
        private _scale: number = 1,
        private _offsetX: number = 0, 
        private _offsetY: number = 0,
        piece?: tet.PieceColor
        
    ) {
        this.sprites = [];
        let cont = new PIXI.Container();
        cont.x += _offsetX * _scale;
        cont.y += _offsetY * _scale;

        for (let i = 0; i < 4; i++) {
            this.sprites.push([])
            for (let j = 0; j < 4; j++) {
                let sprite = new PIXI.Sprite();
                sprite.y += i*32*_scale;
                sprite.x += j*32*_scale;
                sprite.scale = _scale;
                cont.addChild(sprite);
                this.sprites[i].push(sprite);
            }
        }
        this._skin = skin;
        this._piece = piece;
        this.piece = piece;
        this._container = cont;
    }
}
class InfoDisplay<T> {
    private _el: HTMLSpanElement;
    private _label: string;  
    private _value?: T;
    private _units: string = "";
    private _game?: Game;
    private _format?: (value: T) => string;
    public constructor (label: string, game?: Game, format?: (value: T) => string) {
        this._el = document.createElement("span");
        this._el.classList.add("info-display");
        this._el.id = `info-display-el-${label}`;
        this._label = label;
        this._game = game;
        this._format = format;
    }
    public update() {
        if (this._game) {
            
            if (this._game.state[this._label] != undefined) {
                this._value = this._game.state[this._label];
            }
        } 

        this._el.innerText = `${this._label.toUpperCase()} \
        ${this._format && this._value ? this._format(this._value) : this._value}${this._units}\
        `;

        
        
    }
    public set value(v: T) {
        this._value = v;
        this.update();
    }
    public get value() : T {
        return this._value as T;
    }
    public set units(v: string) {
        this.units = v;
        this.update();
    }
    public get units() : string {
        return this._units;
    }
    public set label(v: string) {
        this._label = v;
        this.update();
    }
    public get label() : string {
        return this._label;
    }
    public get element() : HTMLSpanElement {
        return this._el;
    }

}
interface Key {
    pressed: boolean,
    justPressed: boolean,
    pressStart: number

}
function Key(): Key {
    return {
        pressed: false,
        justPressed: false,
        pressStart: 0
    }
}
class FumenLoadComponent {
    public el: HTMLDivElement;
    game?: Game;
    public loadFumen(fumString: string) {
        let tetFu: tet.TetFumen = tet.TetFumen.load(fumString);
        if (this.game) {
            this.game!.field = new FieldWrapper(tetFu.getPageAt(0).field);
        }
        
    }
    public constructor(game?: Game) {
        this.game = game;
        let div = document.createElement("div");
        let button = document.createElement("button");
        let input = document.createElement("input");
        button.innerText = "Load"
        button.onclick = function() {

        }
        div.appendChild(button);
        div.appendChild(input);
        this.el = div;
    }  
}
interface TouchState {
    elements: {[key: string]: HTMLDivElement},
    offsetX: {[key: string]: number},
    offsetY: {[key: string]: number}
}
let globalTouchState: TouchState = {
    elements: {},
    offsetX: {},
    offsetY: {}
}
let controlMoving = false;
function touchSetup(game: Game): TouchState {
    let elements: {[key: string]: HTMLDivElement} = {};
    let offsetX: {[key: string]: number} = {};
    let offsetY: {[key: string]: number} = {};
    let positionSaved = "";//window.localStorage.getItem("touchPositions");
    let positionData: {[key: string]: {x: string, y: string}} = positionSaved ? JSON.parse(positionSaved) : {};
    if (!positionSaved) {
        const reorder = [4, 5, 2, 1, 0, 3, 6, 7];
        for (let i = 0; i < 8; i++) {
            positionData[Object.keys(game.input)[reorder[i]]] = {
                x: `calc(${(4-(i%5)) * (17 + 3)}vw)`, 
                y: `calc(${(1 - Math.floor(i/5)) * (17 + 3)}vw + 518px)`
            };
        }
        window.localStorage.setItem("touchPositions", JSON.stringify(positionData));
    }
    for (let i = 0; i < 8; i++) {
        let input = Object.keys(game.input)[i];
        let el = document.createElement("div");
        el.id = `touch-${input}`;
        el.classList.add("touch-el");
        el.innerText = inputNames[i];
        el.style.left = positionData[input].x;
        el.style.top = positionData[input].y;
        console.log(document.getElementById("touch"));
        document.getElementById("touch")!.appendChild(el);
        elements[input] = el;
    }
    
    let touchButtonMap = new Map<number, string>();
    function touchStart(e: TouchEvent) {
        e.preventDefault();

        let pressed = e.changedTouches;

        for (let i = 0; i < pressed.length; i++) {
            let touch = pressed[i];
            for (let [k,element] of Object.entries(elements)) {
                let key = k as keyof typeof game.input;
                let rect = element.getBoundingClientRect();
                if (rect.left <= touch.clientX && rect.right >= touch.clientX && rect.top <= touch.clientY && rect.bottom >= touch.clientY) {
                    touchButtonMap.set(touch.identifier, k);
                    if (!controlMoving) {
                        let keyObject = game.input[key] as Key;
                        keyObject.pressed = true;
                        keyObject.justPressed = true;
                        keyObject.pressStart = Date.now();    
                    } else {
                        offsetX[k] = touch.clientX - rect.left;
                        offsetY[k] = touch.clientY - rect.top;
                    }

                }
            }
        }
    }

    function touchEnd(e: TouchEvent) {
        e.preventDefault();
        let released = e.changedTouches;
        for (let i = 0; i < released.length; i++) {
            let touch = released[i];
            let input = touchButtonMap.get(touch.identifier);
            if (input) {
                let keyObject = game.input[input as keyof Input] as Key;
                keyObject.pressed = false;
                keyObject.justPressed = false;
                keyObject.pressStart = 0;
                touchButtonMap.delete(touch.identifier);
            }
            
        }
    }
    function touchMove(e: TouchEvent) {
        if (!controlMoving) {
            return;
        }
        e.preventDefault();
        for (let i = 0; i < e.touches.length; i++) {
            let touch = e.touches[i];
            let input = touchButtonMap.get(touch.identifier);
            if (input) {
                let el = elements[input];
                el.style.left = `calc(${touch.clientX / window.innerWidth * 100}vw - ${offsetX[input]}px)`;
                el.style.top = `calc(${touch.clientY / window.innerHeight * 100}vh - ${offsetY[input]}px)`;
            }
        }
    }
    document.getElementById("touch")!.addEventListener("touchstart", touchStart);
    document.getElementById("touch")!.addEventListener("touchend", touchEnd);
    document.getElementById("touch")!.addEventListener("touchmove", touchMove);
    return { 
        elements,
        offsetX,
        offsetY
    }

}

function randint(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function generate_queue(): tet.Queue {
    let q = new tet.Queue();
    let src = [
        tet.PieceColor.I,
        tet.PieceColor.O,
        tet.PieceColor.T,
        tet.PieceColor.S,
        tet.PieceColor.Z,
        tet.PieceColor.J,
        tet.PieceColor.L
    ];
    for (let i = 6; i > -1; i--) {
        let j = randint(0, i);
        q.insertPiece(src.splice(j,1)[0]);        
    }
    return q;

}
interface Input {
    left: Key,
    right: Key,
    softDrop: Key,
    hardDrop: Key,

    cw: Key,
    ccw: Key,
    hold: Key,
    flip: Key,
    reset: Key,
    
    currentInputDirection: number;
};
const inputNames = [
    "Left",
    "Right",
    "SD",
    "HD",
    "CW",
    "CCW",
    "Hold",
    "180",
]
interface GameState {
    currentGravity: number;
    lastARR: number;
    pieceLifeStart: number;
    L1value: number;
    L2value: number;
    L3value: number;
    frames: number;

    lines: number;
    score: number;
    level: number;

    hdLock: boolean;
    softDrop: boolean;
    dased: boolean;
    held: boolean;

    b2b: number;
    combo: number;

    dead: boolean;
    [key: string]: any;
}
interface Handling {
    DAS: number;
    ARR: number;
    SDF: number;
}
interface Settings {
    gravity: number;
    handling: Handling;
    L1: number;
    L2: number;
    L3: number;
    seeN: number;
    ghostPiece: boolean;
    skin: PIXI.Spritesheet;
}
interface Game {
    field: FieldWrapper;
    fieldGrid: MinoGrid;
    input: Input;
    queue: tet.Queue;

    queueDisplays: PieceDisplay[];
    holdDisplay: PieceDisplay;
    queueStage: PIXI.Container;
    queueRenderer: PIXI.Renderer;
    holdRenderer: PIXI.Renderer;
    renderer: PIXI.Renderer;
    infoDisplays: InfoDisplay<any>[];

    state: GameState;
    settings: Settings;



}
let SCORE_MAP = {
    "SINGLE": 200,
    "DOUBLE": 300,
    "TRIPLE": 500,
    "QUAD": 800,
    "SOFTDROP": 1,
    "HARDDROP": 2,
    "PC": 3000,
    "TSM0": 100,
    "TS0": 400,
    "TSMS": 200,
    "TSS": 800,
    "TSD": 1200,
    "TST": 1600

}
function onInput(
    e: KeyboardEvent,
    map: {
        left: string,
        right: string,
        softDrop: string,
        hardDrop: string,

        cw: string,
        ccw: string,
        hold: string,
        flip: string
    }, 
    game: Game
) {
    if (e.repeat) {
        return;
    }
    let key = "" as keyof typeof map;
    for (let k in map) {
        if (map[k as keyof typeof map] === e.key) {
            key = k as keyof typeof map;
            break;
        }
    }
    
    if (key in map) {
        if (e.type === 'keydown') {
            game.input[key].pressed = true;
            game.input[key].justPressed = true;
            game.input[key].pressStart = Date.now();
        } else if (e.type === 'keyup') {
            game.input[key].justPressed = false;
            game.input[key].pressed = false;
        }
    }
}
let old = Date.now();
let deltaTime = 0; 
function death(game: Game) {
    console.log("death");
    game.state.dead = true;
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 10; j++) {
            game.field.setTile(j, i, game.field.getTile(j, i) > 0 ? 8 : 0);
        }
    }
    document.getElementById("info-banner-text")!.innerText = "Game Over";
}
function update(game: Game) {
    
    if (game.input.reset.pressed) {
        if (game.input.reset.justPressed) {
            game.input.reset.justPressed = false;
            reset(game);
        }
    }
    if (game.state.dead) {
        // console.log("a");
        game.fieldGrid.update(game.field);
        game.renderer.render(game.fieldGrid.container);
        game.holdRenderer.render(game.holdDisplay.container);
        game.queueRenderer.render(game.queueStage);
        game.state.score = Math.floor(game.state.score);
    } else {
            // console.log(game.state.dead);
        let spin = false;
        let now = Date.now();
        deltaTime = now - old;
        old = now;
        let original = game.field.getActivePiece()?.clone();
        game.state.L3value += deltaTime;
        if (game.field.field.canPlaceActivePiece()) {
            game.state.L1value += deltaTime;
            game.state.L2value += deltaTime;
        }
        

        if (game.input.left.pressed) { 
            if (game.input.left.justPressed) {
                game.state.dased = false;
                game.input.currentInputDirection = 1;
                game.input.left.justPressed = false;
                game.field.moveLeft(1)
                spin = false;
            }
            if (now - game.input.left.pressStart > game.settings.handling.DAS && !game.state.dased && game.input.currentInputDirection != 2) {
                game.field.moveLeft(1)
                if (game.settings.handling.ARR < 1) {  
                    game.field.dasPiece(tet.Direction.West, 100000);
                }
                game.state.dased = true;
            } else if (game.state.dased && game.input.currentInputDirection != 2) {
                if (game.settings.handling.ARR < 1) { 
                    
                    game.field.dasPiece(tet.Direction.West, 100000);
                } else if (now - game.state.lastARR >= game.settings.handling.ARR) {
                    game.state.lastARR = now;
                    game.field.moveLeft(1);
                }
            }
            
        }
        if (game.input.right.pressed) { 
            if (game.input.right.justPressed) {
                game.state.dased = false;
                game.input.currentInputDirection = 2;
                game.input.right.justPressed = false;
                game.field.moveRight(1);
                spin = false;
            }
            if (now - game.input.right.pressStart > game.settings.handling.DAS && !game.state.dased && game.input.currentInputDirection != 1) {
                game.field.moveRight(1)
                if (game.settings.handling.ARR < 1) {  
                    game.field.dasPiece(tet.Direction.East, 100000);
                }
                game.state.dased = true;
            } else if (game.state.dased && game.input.currentInputDirection != 1) {
                if (game.settings.handling.ARR < 1) { 
                    
                    game.field.dasPiece(tet.Direction.East, 100000);
                } else if (now - game.state.lastARR >= game.settings.handling.ARR) {
                    game.state.lastARR = now;
                    game.field.moveRight(1);
                }
            }
            
        }
        if (!game.input.left.pressed && !game.input.right.pressed) {
            game.state.dased = false;
            game.input.currentInputDirection = 0;
        } else {
            game.state.L1value = 0;
        }
        if (game.input.cw.pressed) {
            if (game.input.cw.justPressed) {
                game.input.cw.justPressed = false;
                game.field.rotatePiece(1);
                game.state.L1value = 0;
                spin = true;
            }
        }
        if (game.input.ccw.pressed) {
            if (game.input.ccw.justPressed) {
                game.input.ccw.justPressed = false;
                game.field.rotatePiece(3);
                game.state.L1value = 0;
                spin = true;
            }
        }
        if (game.input.flip.pressed) {
            if (game.input.flip.justPressed) {
                game.input.flip.justPressed = false;
                game.field.rotatePiece(2);
                game.state.L1value = 0;
                spin = true;
            }
        }
        if (game.input.softDrop.pressed) {
            if (game.input.softDrop.justPressed) {
                game.input.softDrop.justPressed = false;
            }
            game.state.softDrop = true;
        } else {
            game.state.softDrop = false;
        }

        game.state.currentGravity += game.settings.gravity * (game.state.softDrop ? game.settings.handling.SDF : 1) 
        * Math.max(1,Math.pow(2,game.state.level/3.2)) * deltaTime/16;
        
        if (game.state.currentGravity > 1) { 
            game.field.dasPiece(tet.Direction.South, Math.floor(game.state.currentGravity));
            game.state.currentGravity = 0;
            if (original && game.field.getActivePiece()) {
                game.state.score += game.state.softDrop ? 
                (original.position[1] - game.field.getActivePiece()!.position[1]) * SCORE_MAP.SOFTDROP : 0;
            }
            
        }
        let create_new_piece = false;
        if (game.input.hold.pressed && game.input.hold.justPressed && !game.state.held) {
            game.input.hold.justPressed = false;
            game.state.held = true;
            let hold = game.field.getHold();
            let active = game.field.getActivePiece();
            let color = active?.color;
            game.holdDisplay.piece = color;
            if (hold) {
                game.field.setHold(active); 
                hold.rotation = tet.Direction.North;
                hold.position = new tet.Vec2(4, 19);
                game.field.setActivePiece(hold);
                
            } else {
                game.field.setHold(active);
                create_new_piece = true;
            }
            
        } else {
            
            if (game.input.hardDrop.pressed && true) {
                if (game.input.hardDrop.justPressed) {
                    game.input.hardDrop.justPressed = false;
                    game.field.dasPiece(tet.Direction.South, 9999999999999);
                    if (original && game.field.getActivePiece()) {
                        game.state.score += 
                        (original.position[1] - game.field.getActivePiece()!.position[1]) 
                        * SCORE_MAP.HARDDROP;
                    }
                    game.state.hdLock = true;

                }

            }

            if (game.state.L1value > game.settings.L1 || game.state.L2value > game.settings.L2 || game.state.L3value > game.settings.L3 || game.state.hdLock) {
                // console.log("L1:", game.state.L1value, "L2:", game.state.L2value, "L3:", game.state.L3value);
                let scoreToAdd = 0;
                if (game.field.field.canPlaceActivePiece()) {
                    game.field.placeActivePiece();
                    for (let mino of game.field.getActivePiece()!.getMinos()) {
                        let x = mino[0];
                        let y = mino[1];
                    }
                    game.state.held = false;
                    // console.log(game.field.field.board.getTileMatrix().reverse());
                    let rows = game.field.field.board.get_filled_rows();
                    game.state.lines += rows.length;
                    let isT = game.field.getActivePiece()?.color == tet.PieceColor.T;
                    if (isT) {
                        let spin = game.field.checkTSpin();
                        if (spin == tet.TSpinResult.MiniSpin) {

                            switch (rows.length) {
                                case 0:
                                    scoreToAdd += SCORE_MAP.TSM0
                                case 1:
                                    game.state.b2b += 1;
                                    scoreToAdd += SCORE_MAP.TSMS * (game.state.b2b > 0 ? 1.5 : 1);
                                    break;
                                default:
                                    break;
                                
                            }
                        
                        } else if (spin == tet.TSpinResult.TSpin) {

                            switch (rows.length) {
                                case 0:
                                    scoreToAdd += SCORE_MAP.TS0;
                                    break;
                                case 1:
                                    scoreToAdd += SCORE_MAP.TSS * (game.state.b2b > 0 ? 1.5 : 1);
                                    break;
                                case 2:
                                    scoreToAdd += SCORE_MAP.TSD * (game.state.b2b > 0 ? 1.5 : 1);
                                    break;
                                case 3:
                                    scoreToAdd += SCORE_MAP.TST * (game.state.b2b > 0 ? 1.5 : 1);
                                    break;
                                default:
                                    break;
                                
                            }
                            if (rows.length > 0) {
                                game.state.b2b += 1;
                            }
                        } else {

                            switch (rows.length) {
                                case 1:
                                    scoreToAdd += SCORE_MAP.SINGLE;
                                    break;
                                case 2:
                                    scoreToAdd += SCORE_MAP.DOUBLE;
                                    break;
                                case 3:
                                    scoreToAdd += SCORE_MAP.TRIPLE;
                                    break;
                                case 4:
                                    scoreToAdd += SCORE_MAP.QUAD * (game.state.b2b > 0 ? 1.5 : 1);
                                    break;
                                default:
                                    break;
                            }
                            if (rows.length > 3) {
                                game.state.b2b += 1;
                            } else {
                                game.state.b2b = 0
                            }
                        }
                    } else {

                        switch (rows.length) {
                            case 1:
                                scoreToAdd += SCORE_MAP.SINGLE;
                                break;
                            case 2:
                                scoreToAdd += SCORE_MAP.DOUBLE;
                                break;
                            case 3:
                                scoreToAdd += SCORE_MAP.TRIPLE;
                                break;
                            case 4:
                                scoreToAdd += SCORE_MAP.QUAD * (game.state.b2b > 0 ? 1.5 : 0);
                                break;
                            default:
                                break;
                            
                        }
                        if (rows.length > 3) {
                            game.state.b2b += 1;
                        } else {
                            game.state.b2b = 0
                        }
                    }
                    if (rows.length > 0) {
                        scoreToAdd += game.state.combo * 50;
                        
                        game.state.combo += 1;
                    } else {
                        game.state.combo = 0;
                    }
                    for (let row of rows) {
                        for (let j = 0; j < 10; j++) {
                            game.field.setTile(j, row, 0);
                        }
                        for (let i = row; i < 24; i++) {
                            for (let j = 0; j < 10; j++) {
                                game.field.setTile(j, i, game.field.getTile(j, i+1));
                            }
                        }
                    }
                    // console.log(game.field.field.board.getTileMatrix().reverse());
                    if (game.field.checkPC()) {
                        scoreToAdd += SCORE_MAP.PC;
                    }
                    console.log(scoreToAdd, game.state.level);
                    game.state.score += scoreToAdd * game.state.level;
                    game.state.level = Math.floor(game.state.lines / 10) + 1;
                    create_new_piece = true;

                }
            }
        }
        game.fieldGrid.update(game.field);
        if (game.settings.ghostPiece && !create_new_piece) {
            let active = game.field.getActivePiece();
            if (active) {
                let test = active.clone();
                let texture_color = game.settings.skin.textures[tet.pieceColorToChar(active.color)];
                game.field.field.board.dasPiece(test, tet.Direction.South, 999);
                for (let mino of test.getMinos()) {
                    let x = mino[0];
                    let y = 19 - mino[1];
                    if (y < 0) continue;
                    game.fieldGrid.sprites[y][x].texture = texture_color;
                    game.fieldGrid.sprites[y][x].alpha = 0.7;
                }
            }
        }
        game.fieldGrid.updateActive(game.field);
        game.renderer.render(game.fieldGrid.container);
        game.holdRenderer.render(game.holdDisplay.container);
        game.queueRenderer.render(game.queueStage);
        game.state.score = Math.floor(game.state.score);
        if (create_new_piece) {
            game.field.setActivePiece(undefined);
            let color = game.queue.takeNextPiece()!;
            if (game.queue.len() < game.settings.seeN + 3) {
                let i = generate_queue();
                // [0,0,0,0,0,0,0,0].forEach(v=>i.pushBack(new tet.QueueNode(tet.QueueNodeType.Piece, null, tet.PieceColor.I, null)));
                
                game.queue.append(i);

            }
            game.queueDisplays.forEach((v, i) => {
                v.piece = game.queue.at(i) ? game.queue.at(i)?.piece : undefined
            })
            let new_piece = new tet.TetPiece(color, tet.Direction.North, new tet.Vec2(4,19));
            
            if (game.field.field.board.doesCollide(new_piece.clone())) {
                new_piece.position[1] += 1;
                if (game.field.field.board.doesCollide(new_piece.clone())) {
                    death(game);
                    return;
                }
            }
            game.field.setActivePiece(new_piece);
            game.state.hdLock = false;
            game.state.L1value = 0;
            game.state.L2value = 0;
            game.state.L3value = 0;
        }
    }   
    game.infoDisplays.forEach((v, i) => {

        v.update();
    })
    game.state.frames += 1;
}
let keymap = {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    softDrop: 'ArrowDown',
    hardDrop: ' ',
    cw: 'ArrowUp',
    ccw: 'z',
    hold: 'c',
    flip: 'a',
    reset: 'r'
};
(globalThis as any).keymap = keymap;
let seeN = 5;
function countdown(game: Game) {
    document.getElementById("info-banner-text")!.innerText = "3";
    document.getElementById("info-banner")!.style.color = "#d61818";
    setTimeout(() => {
        document.getElementById("info-banner-text")!.innerText = "2";
        document.getElementById("info-banner")!.style.color = "#e6960b";
        setTimeout(() => {
            document.getElementById("info-banner-text")!.innerText = "1";
            document.getElementById("info-banner")!.style.color = "#f0f005";
            setTimeout(() => {
                document.getElementById("info-banner-text")!.innerText = "Go!";
                document.getElementById("info-banner")!.style.color = "#08c912";
                game.state.dead = false;
                game.field.setActivePiece(
                    new tet.TetPiece(game.queue.takeNextPiece() as tet.PieceColor, 0, new tet.Vec2(4, 19))
                );
                game.queueDisplays.forEach((v, i) => {
                    v.piece = game.queue.at(i) ? game.queue.at(i)?.piece : undefined
                })
                document.getElementById("info-banner-text")!.style.opacity = "1";
                // setInterval(() => {
                //     console.log(Number(document.getElementById("info-banner-text")!.style.opacity) - 0.001);
                //     document.getElementById("info-banner-text")!.style.opacity = `${Number(document.getElementById("info-banner-text")!.style.opacity) - 0.05}`
                // }, 66);
                setTimeout(() => {
                    document.getElementById("info-banner-text")!.innerText = "";
                }, 3000)
            }, 1000);
        }, 1000);
    }, 1000);

}
function createInfoDisplay<T>(label: string, game: Game, format?: (value: T) => string): InfoDisplay<T> {
    let infoDisplay = new InfoDisplay<T>(label, game, format);
    game.infoDisplays.push(infoDisplay);
    document.getElementById("info")!.appendChild(infoDisplay.element);

    return infoDisplay;
}
function reset(game: Game) {
    let queue = new tet.Queue(); 
    queue.append(generate_queue());
    queue.append(generate_queue());
    game.field = new FieldWrapper();
    game.queue = queue;
    game.state.currentGravity = 0;
    game.state.softDrop = false;
    game.state.lastARR = 0;
    game.state.dased = false;
    game.state.pieceLifeStart = Date.now();
    game.state.frames = 0;
    game.state.lines = 0;
    game.state.L1value = 0;
    game.state.L2value = 0;
    game.state.L3value = 0;
    game.state.hdLock = false;
    game.settings.seeN = seeN;
    game.input.currentInputDirection = 0;
    game.state.combo = 0;
    game.state.b2b = 0;
    game.state.score = 0;
    game.state.level = 1;
    game.state.held = false;
    game.state.dead = true;

    game.queueDisplays.forEach((v, i) => {
        v.piece = game.queue.at(i) ? game.queue.at(i)?.piece : undefined
    })
    game.holdDisplay.piece = undefined;
    countdown(game);
}
const BaseDimensions = {
    board: {
        width: (game: Game) => 10,
        height: (game: Game) => 20
    },
    hold: {
        width: (game: Game) => 4,
        height: (game: Game) => 4
    },
    queue: {
        width: (game: Game) => 4,
        height: (game: Game) => game.settings.seeN * 4
    },
    scale: 0.5

}
function load(game: Game) {
    let keyMap = window.localStorage.getItem("keymap");
    if (keyMap) {
        keymap = JSON.parse(keyMap);
        
    } else {
        window.localStorage.setItem("keymap", JSON.stringify(keymap));
    }
    let handling = window.localStorage.getItem("handling");
    if (handling) {
        game.settings.handling = JSON.parse(handling);
    } else {
        window.localStorage.setItem("handling", JSON.stringify(game.settings.handling));
    }

}
function saveSettings(
    game: Game,
    inputElements: Map<
        keyof typeof keymap,
        HTMLInputElement
    >,
    handlingElements: Map<
        keyof Game["settings"]["handling"],
        HTMLInputElement
    >
) {
    for (let [k, v] of inputElements.entries()) {
        keymap[k] = v.value == "Space" ? " " : v.value;
    }
    for (let [k, v] of handlingElements.entries()) {
        game.settings.handling[k] = Number(v.value);
    }
    window.localStorage.setItem("keymap", JSON.stringify(keymap));
    window.localStorage.setItem("handling", JSON.stringify(game.settings.handling));
    let touchPositions: {[key: string]: {x: string, y: string}} = {};
    for (let i = 0; i < 8; i++) {
        touchPositions[Object.keys(game.input)[i]] = {
            x: globalTouchState.elements[Object.keys(game.input)[i]].style.left,    
            y: globalTouchState.elements[Object.keys(game.input)[i]].style.top
        }
    }
    window.localStorage.setItem("touchPositions", JSON.stringify(touchPositions));
    document.getElementById("settings")!.style.display = "none";
    controlMoving = false;
}
async function init_app() {
    

    await init();
    let minoSheet: PIXI.Spritesheet = await PIXI.Assets.load("assets/skin_sheet.json");
    let renderer = new PIXI.WebGLRenderer();
    let holdRenderer = new PIXI.WebGLRenderer();
    let queueRenderer = new PIXI.WebGLRenderer();
    let field = new FieldWrapper();
    let fieldGrid = new MinoGrid(20, 10, BaseDimensions.scale, minoSheet);
    let holdDisplay = new PieceDisplay(minoSheet, BaseDimensions.scale)
    let queueStage = new PIXI.Container();
    let queue = new tet.Queue();
    let queueDisplays = [];
    queue.append(generate_queue());
    queue.append(generate_queue());
    queue.append(generate_queue());
    field.setActivePiece(
        new tet.TetPiece(queue.takeNextPiece() as tet.PieceColor, 0, new tet.Vec2(4, 19))
    );
    for (let i = 0; i < seeN; i++) {
        let display = new PieceDisplay(minoSheet,  BaseDimensions.scale, 0, i * 4 * 24 );
        display.piece = queue.at(i)?.piece;
        queueStage.addChild(display.container);
        queueDisplays.push(display);
    }

    
    let game: Game = {
        field: field,
        fieldGrid: fieldGrid,
        input: {
            left: Key(),
            right: Key(),
            softDrop: Key(),
            hardDrop: Key(),

            cw: Key(),
            ccw: Key(),
            hold: Key(),
            flip: Key(),
            reset: Key(),

            currentInputDirection: 0,
        },
        queue: queue,
        state: {
            currentGravity: 0,
            frames: 0,
            lines: 0,
            lastARR: 0,
            pieceLifeStart: Date.now(),
            L1value: 0,
            L2value: 0,
            L3value: 0,

            dased: false,
            hdLock: false,
            held: false,
            softDrop: false,

            score: 0,
            b2b: 0,
            combo: 0,

            dead: false,
            level: 1
        },

        settings: {
            gravity: 0.01,
            handling: {
                DAS: 133,
                ARR: 10,
                SDF: 20
            },
            L1: 500,
            L2: 5000,
            L3: 20000,
            ghostPiece: true,
            skin: minoSheet,
            seeN: seeN
        },
        queueDisplays: queueDisplays,
        holdDisplay: holdDisplay,
        queueRenderer: queueRenderer,
        holdRenderer: holdRenderer,
        renderer: renderer,
        queueStage: queueStage,
        infoDisplays: []
    };
    load(game);
    await renderer.init({
        "backgroundAlpha": 0,
        "height": (BaseDimensions.board.height(game) + 2/16) * 32 * BaseDimensions.scale,
        "width": (BaseDimensions.board.width(game) + 0/16) * 32 * BaseDimensions.scale
    });
    await holdRenderer.init({
        "backgroundAlpha": 0,
        "height": BaseDimensions.hold.height(game) * 32 * BaseDimensions.scale,
        "width": BaseDimensions.hold.width(game) * 32 * BaseDimensions.scale
    });
    await queueRenderer.init({
        "backgroundAlpha": 0,
        "height": BaseDimensions.queue.height(game) * 32 * BaseDimensions.scale,
        "width": BaseDimensions.queue.width(game) * 32 * BaseDimensions.scale
    });
    (globalThis as any).__PIXI_RENDERER__ = renderer;
    (globalThis as any).game = game;
    (globalThis as any).tet = tet;
    let holdDiv = document.getElementById("hold")!;
    let boardDiv = document.getElementById("board")!;
    let queueDiv = document.getElementById("queue")!;
    boardDiv.style.height = Math.round(BaseDimensions.board.height(game) * 32 * BaseDimensions.scale) + "px";
    boardDiv.style.width = Math.round(BaseDimensions.board.width(game) * 32 * BaseDimensions.scale) + "px";
    queueDiv.style.height = Math.round(BaseDimensions.queue.height(game) * 32 * BaseDimensions.scale) + "px";
    queueDiv.style.width = Math.round(BaseDimensions.queue.width(game) * 32 * BaseDimensions.scale) + "px";
    holdDiv.style.height = Math.round(BaseDimensions.hold.height(game) * 32 * BaseDimensions.scale) + "px";
    holdDiv.style.width = Math.round(BaseDimensions.hold.width(game) * 32 * BaseDimensions.scale) + "px";
    // boardDiv.style.left = `${Number(boardDiv.style.left)+0.2*512}px`;
    console.log(boardDiv.offsetLeft);
    document.getElementById("board")!.appendChild(renderer.canvas);
    document.getElementById("queue")!.appendChild(queueRenderer.canvas);
    document.getElementById("hold")!.appendChild(holdRenderer.canvas);
    let scoreDisplay = createInfoDisplay<number>("score", game, (x: number) => x.toLocaleString());
    let linesDisplay = createInfoDisplay<number>("lines", game);
    document.body.addEventListener('keydown', (e) => onInput(e, keymap, game));
    document.body.addEventListener('keyup', (e) => onInput(e, keymap, game));
    
    setInterval(() => {
        update(game)
    }, 1.6);

    function createKeyInputElement(key: keyof typeof keymap) {
        
        let container = document.createElement("div");
        container.id = `settings-key-${key}`;
        let label = document.createElement("label");
        label.id = `settings-${key}-label`;
        label.innerText = `${key[0].toUpperCase() + key.slice(1)} key: `;
        let input = document.createElement("input");
        input.classList.add("settings-input");
        input.id = `settings-key-input-${key}`;
        input.value = keymap[key] ? keymap[key] == " " ? "Space" : keymap[key] : "NONE";
        container.appendChild(label);
        container.appendChild(input);
        function onKeyDown(e: KeyboardEvent) {
            keymap[key] = e.key;
            input.value = keymap[key] ? keymap[key] == " " ? "Space" : keymap[key] : "NONE";
            input.blur();
              e.preventDefault();
        }
        input.addEventListener("keydown", onKeyDown);
        document.getElementById("settings")!.appendChild(container);
        return input;
    }
    function createHandlingInputElement(name: keyof Game["settings"]["handling"]) {
        let container = document.createElement("div");
        container.id = `settings-handling-${name}`;
        let label = document.createElement("label");
        label.id = `settings-handling-${name}-label`;
        label.innerText = `${name[0].toUpperCase() + name.slice(1)}: `;
        let input = document.createElement("input");
        input.classList.add("settings-input");
        input.id = `settings-handling-input${name}`;
        input.value = game.settings.handling[name].toString();
        input.type = 'number';
        container.appendChild(label);
        container.appendChild(input);
        function onKeyDown(e: KeyboardEvent) {
            game.settings.handling[name] = Number(input.value);
        }
        input.addEventListener("keydown", onKeyDown);
        document.getElementById("settings")!.appendChild(container);
        return input;
    }


    let inputElements = new Map<keyof typeof keymap, HTMLInputElement>();
    Object.keys(keymap).forEach(key => inputElements.set(
        key as keyof typeof keymap,
        createKeyInputElement(key as keyof typeof keymap)
    ));
    let handlingElements = new Map<
        keyof Game["settings"]["handling"], 
        HTMLInputElement
    >();
    Object.keys(game.settings.handling).forEach(
        key => handlingElements.set(
            key as keyof Game["settings"]["handling"],
            createHandlingInputElement(
                key as keyof Game["settings"]["handling"]
            )
        )
    );
    
    let saveButton = document.createElement("button");
    saveButton.id = "save-button";
    saveButton.innerText = "Save";
    saveButton.addEventListener("click", () => saveSettings(
        game, 
        inputElements, 
        handlingElements
    ));
    document.getElementById("settings")!.appendChild(saveButton);
    let settings_button = document.getElementById("settings-button")!;
    console.log(settings_button);
    settings_button.onclick = function() {
        
        if (document.getElementById("settings")!.style.display == "block") {
            document.getElementById("settings")!.style.display = "none";
            controlMoving = false;
            console.log("controlMoving", controlMoving);
            return;
        } else {
            controlMoving = true;
        }
        document.getElementById("settings")!.style.display = "block";
        
    }
    let reset_button = document.getElementById("reset-button")!;
    reset_button.onclick = function() {
        reset(game);
    }
    globalTouchState = touchSetup(game);
}
window.onload = init_app;