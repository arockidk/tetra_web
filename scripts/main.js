import init, * as tet from "./pkg/rust_tetro.js";
window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
class MinoGrid {
    // #region Properties
    _minos;
    _minoTexture;
    _scale;
    sprites;
    get scale() {
        return this._scale;
    }
    set scale(v) {
        this._scale = v;
    }
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
    _container;
    get container() {
        return this._container;
    }
    set container(v) {
        this._container = v;
    }
    getSprite(x, y) {
        return this.sprites[y][x];
    }
    setSprite(x, y, new_sprite) {
        this.sprites[y][x] = new_sprite;
    }
    // #endregion
    preRender() {
    }
    update(field) {
        for (let i = 0; i < 200; i++) {
            let y = Math.floor((199 - i) / 10);
            let x = i % 10;
            this._minos[19 - y][x] = field.getTile(x, y);
            this.sprites[19 - y][x].texture = this._minoTexture.textures[tet.pieceColorToChar(this._minos[19 - y][x])];
            this.sprites[19 - y][x].alpha = 1;
        }
    }
    updateActive(field) {
        if (field.getActivePiece() !== undefined) {
            let piece = field.getActivePiece();
            let color = piece.color;
            let minos = piece.getMinos();
            // console.log(minos);
            for (let i = 0; i < 4; i++) {
                let pos = minos[i];
                let x = pos[0];
                let y = pos[1];
                if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
                    continue;
                }
                this.sprites[19 - y][x].texture = this._minoTexture.textures[tet.pieceColorToChar(color)];
                this.sprites[19 - y][x].alpha = 1;
            }
        }
        ;
    }
    constructor(height, width, scale, minoTexture, offsetX = 0, offsetY = 1) {
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
                sprite.label = `${j},${i}, ${j + i * 10}`;
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
    get field() {
        return this._field;
    }
    set field(v) {
        this._field = v;
    }
    constructor(field) {
        this._field = field ?? new tet.Field(new tet.TetBoard());
    }
    getPieceChanges() {
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
    dasPiece(dir, amount) {
        this.field.dasPiece(dir, amount);
    }
    rotatePiece(dir) {
        this.field.rotatePiece(dir);
    }
    setTile(x, y, v) {
        this.field.setTile(x, y, v);
    }
    getTile(x, y) {
        return this.field.getTile(x, y);
    }
    getActivePiece() {
        return this.field.active_piece;
    }
    setActivePiece(piece) {
        this._field.active_piece = piece;
    }
    applyGravity(force) {
        let res = this.field.applyGravity(force);
        return res;
    }
    moveLeft(amount) {
        let res = this.field.moveLeft(amount);
        return res;
    }
    moveRight(amount) {
        let res = this.field.moveRight(amount);
        return res;
    }
    getHold() {
        return this.field.hold;
    }
    setHold(piece) {
        this.field.hold = piece;
    }
    placeActivePiece() {
        return this._field.place_active_piece();
    }
    placeNClearActivePiece() {
        return this._field.place_n_clear_active_piece();
    }
    checkPC() {
        return this._field.checkPC();
    }
    checkTSpin() {
        return this._field.checkTSpin();
    }
}
class PieceDisplay {
    _scale;
    _offsetX;
    _offsetY;
    sprites;
    _piece;
    _container;
    _skin;
    get offsetX() {
        return this._offsetX;
    }
    set offsetX(v) {
        this._container.x -= this.offsetX;
        this._container.x += v;
        this._offsetX = v;
    }
    get offsetY() {
        return this._offsetY;
    }
    set offsetY(v) {
        this._container.y -= this.offsetY;
        this._container.y += v;
        this._offsetY = v;
    }
    get scale() {
        return this._scale;
    }
    set scale(v) {
        let old = this._scale;
        this._scale = v;
        for (let row of this.sprites) {
            for (let sprite of row) {
                sprite.x *= v / old;
                sprite.y *= v / old;
                sprite.scale = v;
            }
        }
    }
    get container() {
        return this._container;
    }
    get piece() {
        return this._piece;
    }
    set piece(v) {
        this._piece = v;
        for (let row of this.sprites) {
            for (let sprite of row) {
                sprite.texture = PIXI.Texture.EMPTY;
            }
        }
        if (v) {
            let minos = (new tet.TetPiece(v, tet.Direction.North, new tet.Vec2(0, 0))).getRawMinos();
            for (let mino of minos) {
                this.sprites[-mino[1] + 2][mino[0] + 1].texture = this._skin.textures[tet.pieceColorToChar(v)];
            }
        }
    }
    constructor(skin, _scale = 1, _offsetX = 0, _offsetY = 0, piece) {
        this._scale = _scale;
        this._offsetX = _offsetX;
        this._offsetY = _offsetY;
        this.sprites = [];
        let cont = new PIXI.Container();
        cont.x += _offsetX;
        cont.y += _offsetY;
        for (let i = 0; i < 4; i++) {
            this.sprites.push([]);
            for (let j = 0; j < 4; j++) {
                let sprite = new PIXI.Sprite();
                sprite.y += i * 32 * _scale;
                sprite.x += j * 32 * _scale;
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
function Key() {
    return {
        pressed: false,
        justPressed: false,
        pressStart: 0
    };
}
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function generate_queue() {
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
        q.insertPiece(src.splice(j, 1)[0]);
    }
    return q;
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
};
function onInput(e, map, game) {
    if (e.repeat) {
        return;
    }
    let key = "";
    for (let k in map) {
        if (map[k] === e.key) {
            key = k;
            break;
        }
    }
    if (key in map) {
        if (e.type === 'keydown') {
            game.inputs[key].pressed = true;
            game.inputs[key].justPressed = true;
            game.inputs[key].pressStart = Date.now();
        }
        else if (e.type === 'keyup') {
            game.inputs[key].justPressed = false;
            game.inputs[key].pressed = false;
        }
    }
}
let old = Date.now();
let deltaTime = 0;
function update(game) {
    let spin = false;
    let now = Date.now();
    deltaTime = now - old;
    old = now;
    let original = game.field.getActivePiece()?.clone();
    game.L3value += deltaTime;
    if (game.field.field.canPlaceActivePiece()) {
        game.L1value += deltaTime;
        game.L2value += deltaTime;
    }
    if (game.inputs.left.pressed) {
        if (game.inputs.left.justPressed) {
            game.dased = false;
            game.currentInputDirection = 1;
            game.inputs.left.justPressed = false;
            game.field.moveLeft(1);
            spin = false;
        }
        console.log(game.dased && game.currentInputDirection != 2);
        if (now - game.inputs.left.pressStart > game.settings.DAS && !game.dased && game.currentInputDirection != 2) {
            game.field.moveLeft(1);
            if (game.settings.ARR < 1) {
                game.field.dasPiece(tet.Direction.West, 100000);
            }
            game.dased = true;
        }
        else if (game.dased && game.currentInputDirection != 2) {
            if (game.settings.ARR < 1) {
                game.field.dasPiece(tet.Direction.West, 100000);
            }
            else if (now - game.lastARR >= game.settings.ARR) {
                game.lastARR = now;
                game.field.moveLeft(1);
            }
        }
    }
    if (game.inputs.right.pressed) {
        if (game.inputs.right.justPressed) {
            game.dased = false;
            game.currentInputDirection = 2;
            game.inputs.right.justPressed = false;
            game.field.moveRight(1);
            spin = false;
        }
        if (now - game.inputs.right.pressStart > game.settings.DAS && !game.dased && game.currentInputDirection != 1) {
            game.field.moveRight(1);
            if (game.settings.ARR < 1) {
                game.field.dasPiece(tet.Direction.East, 100000);
            }
            game.dased = true;
        }
        else if (game.dased && game.currentInputDirection != 1) {
            if (game.settings.ARR < 1) {
                game.field.dasPiece(tet.Direction.East, 100000);
            }
            else if (now - game.lastARR >= game.settings.ARR) {
                game.lastARR = now;
                game.field.moveRight(1);
            }
        }
    }
    if (!game.inputs.left.pressed && !game.inputs.right.pressed) {
        game.dased = false;
        game.currentInputDirection = 0;
    }
    else {
        game.L1value = 0;
    }
    if (game.inputs.cw.pressed) {
        if (game.inputs.cw.justPressed) {
            game.inputs.cw.justPressed = false;
            game.field.rotatePiece(1);
            game.L1value = 0;
            spin = true;
        }
    }
    if (game.inputs.ccw.pressed) {
        if (game.inputs.ccw.justPressed) {
            game.inputs.ccw.justPressed = false;
            game.field.rotatePiece(3);
            game.L1value = 0;
            spin = true;
        }
    }
    if (game.inputs.flip.pressed) {
        if (game.inputs.flip.justPressed) {
            game.inputs.flip.justPressed = false;
            game.field.rotatePiece(2);
            game.L1value = 0;
            spin = true;
        }
    }
    if (game.inputs.softDrop.pressed) {
        if (game.inputs.softDrop.justPressed) {
            game.inputs.softDrop.justPressed = false;
        }
        game.softDrop = true;
    }
    else {
        game.softDrop = false;
    }
    game.currentGravity += game.settings.gravity * (game.softDrop ? game.settings.SDF : 1);
    if (game.currentGravity > 1) {
        game.field.dasPiece(tet.Direction.South, Math.floor(game.currentGravity));
        game.currentGravity = 0;
        if (original && game.field.getActivePiece()) {
            game.score += game.softDrop ?
                (original.position[1] - game.field.getActivePiece().position[1]) * SCORE_MAP.SOFTDROP : 0;
        }
    }
    let create_new_piece = false;
    if (game.inputs.hold.pressed && game.inputs.hold.justPressed && !game.held) {
        game.inputs.hold.justPressed = false;
        game.held = true;
        let hold = game.field.getHold();
        let active = game.field.getActivePiece();
        let color = active?.color;
        game.holdDisplay.piece = color;
        if (hold) {
            game.field.setHold(active);
            hold.rotation = tet.Direction.North;
            hold.position = new tet.Vec2(4, 19);
            game.field.setActivePiece(hold);
        }
        else {
            game.field.setHold(active);
            create_new_piece = true;
        }
    }
    else {
        if (game.inputs.hardDrop.pressed && true) {
            if (game.inputs.hardDrop.justPressed) {
                game.inputs.hardDrop.justPressed = false;
                game.field.dasPiece(tet.Direction.South, 9999999999999);
                if (original && game.field.getActivePiece()) {
                    game.score +=
                        (original.position[1] - game.field.getActivePiece().position[1])
                            * SCORE_MAP.HARDDROP;
                }
                game.hdLock = true;
            }
        }
        if (game.L1value > game.settings.L1 || game.L2value > game.settings.L2 || game.L3value > game.settings.L3 || game.hdLock) {
            // console.log("L1:", game.L1value, "L2:", game.L2value, "L3:", game.L3value);
            if (game.field.field.canPlaceActivePiece()) {
                game.field.placeActivePiece();
                game.held = false;
                // console.log(game.field.field.board.getTileMatrix().reverse());
                let rows = game.field.field.board.get_filled_rows();
                let isT = game.field.getActivePiece()?.color == tet.PieceColor.T;
                if (isT) {
                    let spin = game.field.checkTSpin();
                    if (spin == tet.TSpinResult.MiniSpin) {
                        switch (rows.length) {
                            case 0:
                                game.score += SCORE_MAP.TSM0;
                            case 1:
                                game.b2b += 1;
                                game.score += SCORE_MAP.TSMS * (game.b2b > 0 ? 1.5 : 1);
                                break;
                            default:
                                break;
                        }
                    }
                    else if (spin == tet.TSpinResult.TSpin) {
                        switch (rows.length) {
                            case 0:
                                game.score += SCORE_MAP.TS0;
                                break;
                            case 1:
                                game.score += SCORE_MAP.TSS * (game.b2b > 0 ? 1.5 : 1);
                                break;
                            case 2:
                                game.score += SCORE_MAP.TSD * (game.b2b > 0 ? 1.5 : 1);
                                break;
                            case 3:
                                game.score += SCORE_MAP.TST * (game.b2b > 0 ? 1.5 : 1);
                                break;
                            default:
                                break;
                        }
                        if (rows.length > 0) {
                            game.b2b += 1;
                        }
                    }
                    else {
                        switch (rows.length) {
                            case 1:
                                game.score += SCORE_MAP.SINGLE;
                                break;
                            case 2:
                                game.score += SCORE_MAP.DOUBLE;
                                break;
                            case 3:
                                game.score += SCORE_MAP.TRIPLE;
                                break;
                            case 4:
                                game.score += SCORE_MAP.QUAD * (game.b2b > 0 ? 1.5 : 1);
                                break;
                            default:
                                break;
                        }
                        if (rows.length > 3) {
                            game.b2b += 1;
                        }
                        else {
                            game.b2b = 0;
                        }
                    }
                }
                else {
                    switch (rows.length) {
                        case 1:
                            game.score += SCORE_MAP.SINGLE;
                            break;
                        case 2:
                            game.score += SCORE_MAP.DOUBLE;
                            break;
                        case 3:
                            game.score += SCORE_MAP.TRIPLE;
                            break;
                        case 4:
                            game.score += SCORE_MAP.QUAD * (game.b2b > 0 ? 1.5 : 0);
                            break;
                        default:
                            break;
                    }
                    if (rows.length > 3) {
                        game.b2b += 1;
                    }
                    else {
                        game.b2b = 0;
                    }
                }
                if (rows.length > 0) {
                    game.score += game.combo * 50;
                    game.combo += 1;
                }
                else {
                    game.combo = 0;
                }
                for (let row of rows) {
                    for (let j = 0; j < 10; j++) {
                        game.field.setTile(j, row, 0);
                    }
                    for (let i = row; i < 20; i++) {
                        for (let j = 0; j < 10; j++) {
                            game.field.setTile(j, i, game.field.getTile(j, i + 1));
                        }
                    }
                }
                // console.log(game.field.field.board.getTileMatrix().reverse());
                if (game.field.checkPC()) {
                    game.score += SCORE_MAP.PC;
                }
                create_new_piece = true;
            }
        }
    }
    game.fieldGrid.update(game.field);
    if (game.settings.ghostPiece && !create_new_piece) {
        let active = game.field.getActivePiece();
        if (active) {
            let test = active.clone();
            let texture_color = game.skin.textures[tet.pieceColorToChar(active.color)];
            game.field.field.board.dasPiece(test, tet.Direction.South, 999);
            for (let mino of test.getMinos()) {
                let x = mino[0];
                let y = 19 - mino[1];
                game.fieldGrid.sprites[y][x].texture = texture_color;
                game.fieldGrid.sprites[y][x].alpha = 0.7;
            }
        }
    }
    game.fieldGrid.updateActive(game.field);
    game.renderer.render(game.stage);
    game.score = Math.floor(game.score);
    document.getElementById("score").innerText = `Score: ${game.score}`;
    if (create_new_piece) {
        game.field.setActivePiece(undefined);
        let color = game.queue.takeNextPiece();
        if (game.queue.len() < game.seeN + 3) {
            game.queue.append(generate_queue());
        }
        game.queueDisplay.forEach((v, i) => {
            v.piece = game.queue.at(i) ? game.queue.at(i)?.piece : undefined;
        });
        let new_piece = new tet.TetPiece(color, tet.Direction.North, new tet.Vec2(4, 19));
        game.field.setActivePiece(new_piece);
        game.hdLock = false;
        game.L1value = 0;
        game.L2value = 0;
        game.L3value = 0;
    }
    if (game.inputs.reset.pressed) {
        if (game.inputs.reset.justPressed) {
            game.inputs.reset.justPressed = false;
            console.log("AAA");
            reset(game);
        }
    }
}
let keymap = {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    softDrop: 'ArrowDown',
    hardDrop: ' ',
    cw: 'ArrowUp',
    ccw: 'a',
    hold: 'c',
    flip: 'w',
    reset: 'r'
};
let seeN = 5;
function reset(game) {
    let queue = new tet.Queue();
    queue.append(generate_queue());
    queue.append(generate_queue());
    game.field = new FieldWrapper();
    game.queue = queue;
    game.currentGravity = 0;
    game.softDrop = false;
    game.lastARR = 0;
    game.dased = false;
    game.pieceLifeStart = Date.now();
    game.L1value = 0;
    game.L2value = 0;
    game.L3value = 0;
    game.hdLock = false;
    game.seeN = seeN;
    game.currentInputDirection = 0;
    game.combo = 0;
    game.b2b = 0;
    game.score = 0;
    game.held = false;
    game.field.setActivePiece(new tet.TetPiece(game.queue.takeNextPiece(), 0, new tet.Vec2(4, 19)));
    game.queueDisplay.forEach((v, i) => {
        v.piece = game.queue.at(i) ? game.queue.at(i)?.piece : undefined;
    });
    game.holdDisplay.piece = undefined;
}
async function run() {
    await init();
    let minoSheet = await PIXI.Assets.load("assets/skin_sheet.json");
    let renderer = new PIXI.WebGLRenderer();
    let stage = new PIXI.Container();
    let field = new FieldWrapper();
    let fieldGrid = new MinoGrid(20, 10, 0.8, minoSheet, 100);
    let holdDisplay = new PieceDisplay(minoSheet, 0.8);
    stage.addChild(fieldGrid.container);
    stage.addChild(holdDisplay.container);
    await renderer.init({
        "backgroundColor": "0xbbedf2",
        "height": 600,
        "width": 500
    });
    let game = {
        field: field,
        fieldGrid: fieldGrid,
        inputs: {
            left: Key(),
            right: Key(),
            softDrop: Key(),
            hardDrop: Key(),
            cw: Key(),
            ccw: Key(),
            hold: Key(),
            flip: Key(),
            reset: Key()
        },
        queue: new tet.Queue(),
        currentGravity: 0,
        settings: {
            gravity: 0.01,
            DAS: 96,
            ARR: 0,
            SDF: 999999,
            L1: 500,
            L2: 5000,
            L3: 20000,
            ghostPiece: true
        },
        softDrop: false,
        lastARR: 0,
        dased: false,
        pieceLifeStart: Date.now(),
        L1value: 0,
        L2value: 0,
        L3value: 0,
        hdLock: false,
        seeN: seeN,
        stage: stage,
        renderer: renderer,
        queueDisplay: [],
        holdDisplay: holdDisplay,
        skin: minoSheet,
        currentInputDirection: 0,
        score: 0,
        b2b: 0,
        combo: 0,
        held: false
    };
    globalThis.__PIXI_STAGE__ = stage;
    globalThis.__PIXI_RENDERER__ = renderer;
    globalThis.game = game;
    globalThis.tet = tet;
    document.body.appendChild(renderer.canvas);
    let score = document.createElement("span");
    score.id = "score";
    document.body.appendChild(score);
    document.body.addEventListener('keydown', (e) => onInput(e, keymap, game));
    document.body.addEventListener('keyup', (e) => onInput(e, keymap, game));
    game.queue.append(generate_queue());
    game.queue.append(generate_queue());
    game.queue.append(generate_queue());
    game.field.setActivePiece(new tet.TetPiece(game.queue.takeNextPiece(), 0, new tet.Vec2(4, 19)));
    for (let i = 0; i < seeN; i++) {
        let display = new PieceDisplay(minoSheet, 0.8, 400, i * 4 * 32);
        display.piece = game.queue.at(i)?.piece;
        stage.addChild(display.container);
        game.queueDisplay.push(display);
    }
    setInterval(() => {
        update(game);
    }, 16);
}
run();
//# sourceMappingURL=main.js.map