let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let cachedFloat64Memory0 = null;

function getFloat64Memory0() {
    if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

let cachedBigInt64Memory0 = null;

function getBigInt64Memory0() {
    if (cachedBigInt64Memory0 === null || cachedBigInt64Memory0.byteLength === 0) {
        cachedBigInt64Memory0 = new BigInt64Array(wasm.memory.buffer);
    }
    return cachedBigInt64Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32Memory0().subarray(ptr / 4, ptr / 4 + len);
}
/**
* @param {number} int
* @returns {PieceColor}
*/
export function pieceColorFromInt(int) {
    const ret = wasm.pieceColorFromInt(int);
    return ret;
}

/**
* @param {string} str
* @returns {PieceColor}
*/
export function pieceColorFromStr(str) {
    const ptr0 = passStringToWasm0(str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.pieceColorFromStr(ptr0, len0);
    return ret;
}

/**
* @param {PieceColor} color
* @returns {string}
*/
export function pieceColorToChar(color) {
    const ret = wasm.pieceColorToChar(color);
    return String.fromCodePoint(ret);
}

/**
* @param {Direction} dir
* @returns {number}
*/
export function direction_to_i8(dir) {
    const ret = wasm.direction_to_i32(dir);
    return ret;
}

/**
* @param {Direction} dir
* @returns {number}
*/
export function direction_to_i32(dir) {
    const ret = wasm.direction_to_i32(dir);
    return ret;
}

/**
* @param {Direction} dir
* @returns {bigint}
*/
export function direction_to_i64(dir) {
    const ret = wasm.direction_to_i64(dir);
    return ret;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
export const RotationState = Object.freeze({ South:0,"0":"South",East:1,"1":"East",North:2,"2":"North",West:3,"3":"West", });
/**
*/
export const QueueNodeType = Object.freeze({ Choose:0,"0":"Choose",Piece:1,"1":"Piece", });
/**
*/
export const PieceColor = Object.freeze({ B:0,"0":"B",I:1,"1":"I",L:2,"2":"L",O:3,"3":"O",Z:4,"4":"Z",T:5,"5":"T",J:6,"6":"J",S:7,"7":"S", });
/**
*/
export const Direction = Object.freeze({ North:0,"0":"North",East:1,"1":"East",South:2,"2":"South",West:3,"3":"West", });
/**
*/
export const CellColor = Object.freeze({ Empty:0,"0":"Empty",I:1,"1":"I",L:2,"2":"L",O:3,"3":"O",Z:4,"4":"Z",T:5,"5":"T",J:6,"6":"J",S:7,"7":"S",Grey:8,"8":"Grey", });
/**
*/
export const TSpinResult = Object.freeze({ NoSpin:0,"0":"NoSpin",MiniSpin:1,"1":"MiniSpin",TSpin:2,"2":"TSpin", });
/**
*/
export const PieceType = Object.freeze({ I:1,"1":"I",L:2,"2":"L",O:3,"3":"O",Z:4,"4":"Z",T:5,"5":"T",J:6,"6":"J",S:7,"7":"S", });

const ActionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_action_free(ptr >>> 0));
/**
*
* * Represents a keypress.
* * Bits 8 7 6 5 4 3 2 1
* * Bit 8: Left
* * Bit 7: Right
* * Bit 6: Soft Drop
* * Bit 5: Hard Drop
* * Bit 4: Counter Clockwise
* * Bit 3: Clockwise
* * Bit 2: Hold
* * Bit 1: 180 Rotation
*
*/
export class Action {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ActionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_action_free(ptr);
    }
    /**
    * @returns {number}
    */
    get 0() {
        const ret = wasm.__wbg_get_action_0(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set 0(arg0) {
        wasm.__wbg_set_action_0(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get_left() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.action_get_left(ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    get_right() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.action_get_right(ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    get_soft_drop() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.action_get_soft_drop(ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    get_hard_drop() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.action_get_hard_drop(ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    get_counter_clockwise() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.action_get_counter_clockwise(ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    get_clockwise() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.action_get_clockwise(ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    get_hold() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.action_get_hold(ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    get_180_rotation() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.action_get_180_rotation(ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} value
    */
    set_left(value) {
        const ptr = this.__destroy_into_raw();
        wasm.action_set_180_rotation(ptr, value);
    }
    /**
    * @param {boolean} value
    */
    set_right(value) {
        const ptr = this.__destroy_into_raw();
        wasm.action_set_180_rotation(ptr, value);
    }
    /**
    * @param {boolean} value
    */
    set_soft_drop(value) {
        const ptr = this.__destroy_into_raw();
        wasm.action_set_180_rotation(ptr, value);
    }
    /**
    * @param {boolean} value
    */
    set_hard_drop(value) {
        const ptr = this.__destroy_into_raw();
        wasm.action_set_180_rotation(ptr, value);
    }
    /**
    * @param {boolean} value
    */
    set_counter_clockwise(value) {
        const ptr = this.__destroy_into_raw();
        wasm.action_set_180_rotation(ptr, value);
    }
    /**
    * @param {boolean} value
    */
    set_clockwise(value) {
        const ptr = this.__destroy_into_raw();
        wasm.action_set_180_rotation(ptr, value);
    }
    /**
    * @param {boolean} value
    */
    set_hold(value) {
        const ptr = this.__destroy_into_raw();
        wasm.action_set_180_rotation(ptr, value);
    }
    /**
    * @param {boolean} value
    */
    set_180_rotation(value) {
        const ptr = this.__destroy_into_raw();
        wasm.action_set_180_rotation(ptr, value);
    }
}

const ClearStructFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_clearstruct_free(ptr >>> 0));
/**
*/
export class ClearStruct {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ClearStruct.prototype);
        obj.__wbg_ptr = ptr;
        ClearStructFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ClearStructFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_clearstruct_free(ptr);
    }
    /**
    * @returns {boolean}
    */
    get 0() {
        const ret = wasm.__wbg_get_clearstruct_0(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set 0(arg0) {
        wasm.__wbg_set_clearstruct_0(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {Int32Array}
    */
    getLines() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.clearstruct_getLines(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayI32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const DecodeFumenErrorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_decodefumenerror_free(ptr >>> 0));
/**
*/
export class DecodeFumenError {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DecodeFumenError.prototype);
        obj.__wbg_ptr = ptr;
        DecodeFumenErrorFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DecodeFumenErrorFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_decodefumenerror_free(ptr);
    }
}

const FieldFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_field_free(ptr >>> 0));
/**
*/
export class Field {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FieldFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_field_free(ptr);
    }
    /**
    * @returns {TetBoard}
    */
    get board() {
        const ret = wasm.__wbg_get_field_board(this.__wbg_ptr);
        return TetBoard.__wrap(ret);
    }
    /**
    * @param {TetBoard} arg0
    */
    set board(arg0) {
        _assertClass(arg0, TetBoard);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_field_board(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {TetPiece | undefined}
    */
    get active_piece() {
        const ret = wasm.__wbg_get_field_active_piece(this.__wbg_ptr);
        return ret === 0 ? undefined : TetPiece.__wrap(ret);
    }
    /**
    * @param {TetPiece | undefined} [arg0]
    */
    set active_piece(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TetPiece);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_field_active_piece(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {TetPiece | undefined}
    */
    get hold() {
        const ret = wasm.__wbg_get_field_hold(this.__wbg_ptr);
        return ret === 0 ? undefined : TetPiece.__wrap(ret);
    }
    /**
    * @param {TetPiece | undefined} [arg0]
    */
    set hold(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TetPiece);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_field_hold(this.__wbg_ptr, ptr0);
    }
    /**
    * @param {TetBoard} board
    * @param {TetPiece | undefined} [active_piece]
    * @param {TetPiece | undefined} [hold]
    */
    constructor(board, active_piece, hold) {
        _assertClass(board, TetBoard);
        var ptr0 = board.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(active_piece)) {
            _assertClass(active_piece, TetPiece);
            ptr1 = active_piece.__destroy_into_raw();
        }
        let ptr2 = 0;
        if (!isLikeNone(hold)) {
            _assertClass(hold, TetPiece);
            ptr2 = hold.__destroy_into_raw();
        }
        const ret = wasm.field_new(ptr0, ptr1, ptr2);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {boolean}
    */
    canPlaceActivePiece() {
        const ret = wasm.field_canPlaceActivePiece(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {number} force
    * @returns {boolean}
    */
    applyGravity(force) {
        const ret = wasm.field_applyGravity(this.__wbg_ptr, force);
        return ret !== 0;
    }
    /**
    * @param {number} amount
    * @returns {boolean}
    */
    moveLeft(amount) {
        const ret = wasm.field_moveLeft(this.__wbg_ptr, amount);
        return ret !== 0;
    }
    /**
    * @param {number} amount
    * @returns {boolean}
    */
    moveRight(amount) {
        const ret = wasm.field_moveRight(this.__wbg_ptr, amount);
        return ret !== 0;
    }
    /**
    * @param {Direction} direction
    * @param {number} force
    * @returns {number}
    */
    dasPiece(direction, force) {
        const ret = wasm.field_dasPiece(this.__wbg_ptr, direction, force);
        return ret;
    }
    /**
    * @param {number} rotation
    */
    rotatePiece(rotation) {
        wasm.field_rotatePiece(this.__wbg_ptr, rotation);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {number}
    */
    getTile(x, y) {
        const ret = wasm.field_getTile(this.__wbg_ptr, x, y);
        return ret;
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} color
    */
    setTile(x, y, color) {
        wasm.field_setTile(this.__wbg_ptr, x, y, color);
    }
    /**
    * @returns {boolean}
    */
    place_active_piece() {
        const ret = wasm.field_place_active_piece(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {ClearStruct}
    */
    place_n_clear_active_piece() {
        const ret = wasm.field_place_n_clear_active_piece(this.__wbg_ptr);
        return ClearStruct.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    checkPC() {
        const ret = wasm.field_checkPC(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {TSpinResult}
    */
    checkTSpin() {
        const ret = wasm.field_checkTSpin(this.__wbg_ptr);
        return ret;
    }
}

const FumenFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fumen_free(ptr >>> 0));
/**
*/
export class Fumen {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Fumen.prototype);
        obj.__wbg_ptr = ptr;
        FumenFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FumenFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fumen_free(ptr);
    }
    /**
    * @returns {boolean}
    */
    get guideline() {
        const ret = wasm.__wbg_get_fumen_guideline(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set guideline(arg0) {
        wasm.__wbg_set_fumen_guideline(this.__wbg_ptr, arg0);
    }
    /**
    */
    constructor() {
        const ret = wasm.fumen_new();
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * Encode as a fumen data string.
    * @returns {string}
    */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fumen_encode(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Decodes a fumen data string.
    *
    * @param {string} data
    * @returns {Fumen}
    */
    static decode(data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fumen_decode(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Fumen.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Create a new page, in the same way as creating a new page in fumen does.
    *
    * This will apply the piece locking, line clear, rise, and mirror rules just like fumen does.
    * @returns {number}
    */
    addPage() {
        const ret = wasm.fumen_addPage(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {Array<any>}
    */
    get pages() {
        const ret = wasm.fumen_pages(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const PageFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_page_free(ptr >>> 0));
/**
*/
export class Page {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Page.prototype);
        obj.__wbg_ptr = ptr;
        PageFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PageFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_page_free(ptr);
    }
    /**
    * @returns {Piece | undefined}
    */
    get piece() {
        const ret = wasm.__wbg_get_page_piece(this.__wbg_ptr);
        return ret === 0 ? undefined : Piece.__wrap(ret);
    }
    /**
    * @param {Piece | undefined} [arg0]
    */
    set piece(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Piece);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_page_piece(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {boolean}
    */
    get rise() {
        const ret = wasm.__wbg_get_page_rise(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set rise(arg0) {
        wasm.__wbg_set_page_rise(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get mirror() {
        const ret = wasm.__wbg_get_page_mirror(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set mirror(arg0) {
        wasm.__wbg_set_page_mirror(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get lock() {
        const ret = wasm.__wbg_get_page_lock(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set lock(arg0) {
        wasm.__wbg_set_page_lock(this.__wbg_ptr, arg0);
    }
    /**
    * Create a page from this page in the same way as fumen does.
    *
    * This will apply the piece locking, line clear, rise, and mirror rules just like fumen does.
    * @returns {Page}
    */
    nextPage() {
        const ret = wasm.page_nextPage(this.__wbg_ptr);
        return Page.__wrap(ret);
    }
    /**
    * @returns {string | undefined}
    */
    get comment() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.page_comment(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Array<any>}
    */
    get field() {
        const ret = wasm.page_field(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Array<any>}
    */
    get garbage_row() {
        const ret = wasm.page_garbage_row(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {string | undefined} [comment]
    */
    set comment(comment) {
        var ptr0 = isLikeNone(comment) ? 0 : passStringToWasm0(comment, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.page_set_comment(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @param {Array<any>} field
    */
    set field(field) {
        wasm.page_set_field(this.__wbg_ptr, addHeapObject(field));
    }
    /**
    * @param {Array<any>} garbage_row
    */
    set garbage_row(garbage_row) {
        wasm.page_set_garbage_row(this.__wbg_ptr, addHeapObject(garbage_row));
    }
}

const PieceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_piece_free(ptr >>> 0));
/**
* Represents a tetromino piece using true rotation.
*/
export class Piece {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Piece.prototype);
        obj.__wbg_ptr = ptr;
        PieceFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PieceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_piece_free(ptr);
    }
    /**
    * @returns {PieceType}
    */
    get kind() {
        const ret = wasm.__wbg_get_piece_kind(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {PieceType} arg0
    */
    set kind(arg0) {
        wasm.__wbg_set_piece_kind(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {RotationState}
    */
    get rotation() {
        const ret = wasm.__wbg_get_piece_rotation(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {RotationState} arg0
    */
    set rotation(arg0) {
        wasm.__wbg_set_piece_rotation(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get x() {
        const ret = wasm.__wbg_get_piece_x(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set x(arg0) {
        wasm.__wbg_set_piece_x(this.__wbg_ptr, arg0);
    }
    /**
    * y-up
    * @returns {number}
    */
    get y() {
        const ret = wasm.__wbg_get_piece_y(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * y-up
    * @param {number} arg0
    */
    set y(arg0) {
        wasm.__wbg_set_piece_y(this.__wbg_ptr, arg0);
    }
}

const QueueFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_queue_free(ptr >>> 0));
/**
*/
export class Queue {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Queue.prototype);
        obj.__wbg_ptr = ptr;
        QueueFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        QueueFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_queue_free(ptr);
    }
    /**
    */
    constructor() {
        const ret = wasm.queue_new();
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {number} idx
    * @returns {QueueNode | undefined}
    */
    at(idx) {
        const ret = wasm.queue_at(this.__wbg_ptr, idx);
        return ret === 0 ? undefined : QueueNode.__wrap(ret);
    }
    /**
    * @param {number} idx
    * @returns {number}
    */
    mut_at(idx) {
        const ret = wasm.queue_mut_at(this.__wbg_ptr, idx);
        return ret >>> 0;
    }
    /**
    * @param {Queue} queue
    */
    append(queue) {
        _assertClass(queue, Queue);
        var ptr0 = queue.__destroy_into_raw();
        wasm.queue_append(this.__wbg_ptr, ptr0);
    }
    /**
    * @param {any} node
    */
    pushBack(node) {
        wasm.queue_pushBack(this.__wbg_ptr, addHeapObject(node));
    }
    /**
    * @returns {any}
    */
    popBack() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.queue_popBack(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} node
    */
    pushFront(node) {
        wasm.queue_pushFront(this.__wbg_ptr, addHeapObject(node));
    }
    /**
    * @returns {any}
    */
    popFront() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.queue_popFront(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {QueueNode}
    */
    head() {
        const ret = wasm.queue_head(this.__wbg_ptr);
        return QueueNode.__wrap(ret);
    }
    /**
    * @param {string} s
    * @returns {Queue | undefined}
    */
    static fromString(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.queue_fromString(ptr0, len0);
        return ret === 0 ? undefined : Queue.__wrap(ret);
    }
    /**
    * @param {PieceColor} piece
    */
    insertPiece(piece) {
        wasm.queue_insertPiece(this.__wbg_ptr, piece);
    }
    /**
    * @returns {PieceColor | undefined}
    */
    takeNextPiece() {
        const ret = wasm.queue_takeNextPiece(this.__wbg_ptr);
        return ret === 8 ? undefined : ret;
    }
    /**
    * @returns {number}
    */
    len() {
        const ret = wasm.queue_len(this.__wbg_ptr);
        return ret >>> 0;
    }
}

const QueueNodeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_queuenode_free(ptr >>> 0));
/**
*/
export class QueueNode {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(QueueNode.prototype);
        obj.__wbg_ptr = ptr;
        QueueNodeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        QueueNodeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_queuenode_free(ptr);
    }
    /**
    * @returns {QueueNodeType}
    */
    get node_type() {
        const ret = wasm.__wbg_get_queuenode_node_type(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {QueueNodeType} arg0
    */
    set node_type(arg0) {
        wasm.__wbg_set_queuenode_node_type(this.__wbg_ptr, arg0);
    }
    /**
    * @param {QueueNodeType} node_type
    * @param {any} choose
    * @param {any} piece
    * @param {any} next
    */
    constructor(node_type, choose, piece, next) {
        const ret = wasm.queuenode_js_new(node_type, addHeapObject(choose), addHeapObject(piece), addHeapObject(next));
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {any}
    */
    get choose() {
        const ret = wasm.queuenode_js_choose(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {PieceColor}
    */
    get piece() {
        const ret = wasm.queuenode_piece(this.__wbg_ptr);
        return ret;
    }
}

const TetBoardFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tetboard_free(ptr >>> 0));
/**
*/
export class TetBoard {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TetBoard.prototype);
        obj.__wbg_ptr = ptr;
        TetBoardFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TetBoardFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tetboard_free(ptr);
    }
    /**
    * @returns {number}
    */
    get height() {
        const ret = wasm.__wbg_get_tetboard_height(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set height(arg0) {
        wasm.__wbg_set_tetboard_height(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get width() {
        const ret = wasm.__wbg_get_tetboard_width(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set width(arg0) {
        wasm.__wbg_set_tetboard_width(this.__wbg_ptr, arg0);
    }
    /**
    */
    constructor() {
        const ret = wasm.tetboard_new();
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {boolean}
    */
    tileOccupied(x, y) {
        const ret = wasm.tetboard_tileOccupied(this.__wbg_ptr, x, y);
        return ret !== 0;
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {number}
    */
    getTile(x, y) {
        const ret = wasm.tetboard_getTile(this.__wbg_ptr, x, y);
        return ret;
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} value
    */
    setTile(x, y, value) {
        wasm.tetboard_setTile(this.__wbg_ptr, x, y, value);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    clearTile(x, y) {
        wasm.tetboard_clearTile(this.__wbg_ptr, x, y);
    }
    /**
    * @param {Uint8Array} arr
    * @returns {TetBoard}
    */
    static fromIntArray(arr) {
        const ret = wasm.tetboard_fromIntArray(addHeapObject(arr));
        return TetBoard.__wrap(ret);
    }
    /**
    * @param {Uint8Array} arr
    * @returns {TetBoard}
    */
    static from4hArray(arr) {
        const ret = wasm.tetboard_from4hArray(addHeapObject(arr));
        return TetBoard.__wrap(ret);
    }
    /**
    * @param {TetPiece} piece
    * @returns {boolean}
    */
    doesCollide(piece) {
        _assertClass(piece, TetPiece);
        var ptr0 = piece.__destroy_into_raw();
        const ret = wasm.tetboard_doesCollide(this.__wbg_ptr, ptr0);
        return ret !== 0;
    }
    /**
    * @param {Vec2} pos
    * @returns {boolean}
    */
    inBounds(pos) {
        _assertClass(pos, Vec2);
        var ptr0 = pos.__destroy_into_raw();
        const ret = wasm.tetboard_inBounds(this.__wbg_ptr, ptr0);
        return ret !== 0;
    }
    /**
    * @param {TetPiece} piece
    * @param {number} rotation
    * @returns {boolean}
    */
    rotatePiece(piece, rotation) {
        _assertClass(piece, TetPiece);
        const ret = wasm.tetboard_rotatePiece(this.__wbg_ptr, piece.__wbg_ptr, rotation);
        return ret !== 0;
    }
    /**
    * @param {TetPiece} piece
    * @param {Direction} direction
    * @param {number} force
    * @returns {number}
    */
    dasPiece(piece, direction, force) {
        _assertClass(piece, TetPiece);
        const ret = wasm.tetboard_dasPiece(this.__wbg_ptr, piece.__wbg_ptr, direction, force);
        return ret;
    }
    /**
    * @param {TetPiece} piece
    * @returns {boolean}
    */
    canPlace(piece) {
        _assertClass(piece, TetPiece);
        var ptr0 = piece.__destroy_into_raw();
        const ret = wasm.tetboard_canPlace(this.__wbg_ptr, ptr0);
        return ret !== 0;
    }
    /**
    * @returns {Uint8Array}
    */
    getTileArray() {
        const ret = wasm.tetboard_getTileArray(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Array<any>}
    */
    getTileMatrix() {
        const ret = wasm.tetboard_getTileMatrix(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {TetPiece} piece
    * @param {number} force
    * @returns {boolean}
    */
    applyGravity(piece, force) {
        _assertClass(piece, TetPiece);
        const ret = wasm.tetboard_applyGravity(this.__wbg_ptr, piece.__wbg_ptr, force);
        return ret !== 0;
    }
    /**
    * @param {TetPiece} piece
    * @param {number} amount
    * @returns {boolean}
    */
    moveLeft(piece, amount) {
        _assertClass(piece, TetPiece);
        const ret = wasm.tetboard_moveLeft(this.__wbg_ptr, piece.__wbg_ptr, amount);
        return ret !== 0;
    }
    /**
    * @param {TetPiece} piece
    * @param {number} amount
    * @returns {boolean}
    */
    moveRight(piece, amount) {
        _assertClass(piece, TetPiece);
        const ret = wasm.tetboard_moveRight(this.__wbg_ptr, piece.__wbg_ptr, amount);
        return ret !== 0;
    }
    /**
    * @returns {Int32Array}
    */
    get_filled_rows() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tetboard_get_filled_rows(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayI32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} row
    */
    clearRow(row) {
        wasm.tetboard_clearRow(this.__wbg_ptr, row);
    }
    /**
    * @param {TetPiece} piece
    * @returns {boolean}
    */
    unplace(piece) {
        _assertClass(piece, TetPiece);
        var ptr0 = piece.__destroy_into_raw();
        const ret = wasm.tetboard_unplace(this.__wbg_ptr, ptr0);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    checkPC() {
        const ret = wasm.tetboard_checkPC(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {TetPiece} piece
    * @returns {TSpinResult}
    */
    checkTSpin(piece) {
        _assertClass(piece, TetPiece);
        var ptr0 = piece.__destroy_into_raw();
        const ret = wasm.tetboard_checkTSpin(this.__wbg_ptr, ptr0);
        return ret;
    }
    /**
    * @param {TetPiece} piece
    * @returns {boolean}
    */
    place(piece) {
        _assertClass(piece, TetPiece);
        var ptr0 = piece.__destroy_into_raw();
        const ret = wasm.tetboard_place(this.__wbg_ptr, ptr0);
        return ret !== 0;
    }
    /**
    * @param {TetPiece} piece
    * @returns {ClearStruct}
    */
    placeNClear(piece) {
        _assertClass(piece, TetPiece);
        var ptr0 = piece.__destroy_into_raw();
        const ret = wasm.tetboard_placeNClear(this.__wbg_ptr, ptr0);
        return ClearStruct.__wrap(ret);
    }
}

const TetFumenFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tetfumen_free(ptr >>> 0));
/**
*/
export class TetFumen {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TetFumenFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tetfumen_free(ptr);
    }
    /**
    * @returns {boolean}
    */
    get guideline() {
        const ret = wasm.__wbg_get_tetfumen_guideline(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set guideline(arg0) {
        wasm.__wbg_set_tetfumen_guideline(this.__wbg_ptr, arg0);
    }
    /**
    */
    constructor() {
        const ret = wasm.tetfumen_new();
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {number}
    */
    addPage() {
        const ret = wasm.tetfumen_addPage(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    */
    update() {
        wasm.tetfumen_update(this.__wbg_ptr);
    }
    /**
    * @returns {string}
    */
    encodeFumen() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tetfumen_encodeFumen(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} fumen
    */
    decodeFumen(fumen) {
        const ptr0 = passStringToWasm0(fumen, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.tetfumen_decodeFumen(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @param {number} idx
    * @returns {number}
    */
    getPageAt(idx) {
        const ret = wasm.tetfumen_getPageAt(this.__wbg_ptr, idx);
        return ret >>> 0;
    }
}

const TetPageFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tetpage_free(ptr >>> 0));
/**
*/
export class TetPage {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TetPage.prototype);
        obj.__wbg_ptr = ptr;
        TetPageFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TetPageFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tetpage_free(ptr);
    }
    /**
    * @returns {boolean}
    */
    get rise() {
        const ret = wasm.__wbg_get_tetpage_rise(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set rise(arg0) {
        wasm.__wbg_set_tetpage_rise(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get lock() {
        const ret = wasm.__wbg_get_tetpage_lock(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set lock(arg0) {
        wasm.__wbg_set_tetpage_lock(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get mirror() {
        const ret = wasm.__wbg_get_tetpage_mirror(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set mirror(arg0) {
        wasm.__wbg_set_tetpage_mirror(this.__wbg_ptr, arg0);
    }
    /**
    * @param {PieceColor} c
    */
    set piece_color(c) {
        wasm.tetpage_set_piece_color(this.__wbg_ptr, c);
    }
    /**
    * @param {Direction} dir
    */
    set piece_rotation(dir) {
        wasm.tetpage_set_piece_rotation(this.__wbg_ptr, dir);
    }
    /**
    * @param {Vec2} pos
    */
    set piece_position(pos) {
        _assertClass(pos, Vec2);
        var ptr0 = pos.__destroy_into_raw();
        wasm.tetpage_set_piece_position(this.__wbg_ptr, ptr0);
    }
    /**
    * @param {Field} field
    */
    set_field(field) {
        _assertClass(field, Field);
        var ptr0 = field.__destroy_into_raw();
        wasm.tetpage_set_field(this.__wbg_ptr, ptr0);
    }
    /**
    * @param {string | undefined} [comment]
    */
    set comment(comment) {
        var ptr0 = isLikeNone(comment) ? 0 : passStringToWasm0(comment, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.tetpage_set_comment(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {number}
    */
    get field() {
        const ret = wasm.tetpage_field(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    get fumen_page() {
        const ret = wasm.tetpage_fumen_page(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {string | undefined}
    */
    get comment() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tetpage_comment(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Page} pg
    * @returns {TetPage}
    */
    static from_fumen_page(pg) {
        _assertClass(pg, Page);
        var ptr0 = pg.__destroy_into_raw();
        const ret = wasm.tetpage_from_fumen_page(ptr0);
        return TetPage.__wrap(ret);
    }
}

const TetPieceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tetpiece_free(ptr >>> 0));
/**
*/
export class TetPiece {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TetPiece.prototype);
        obj.__wbg_ptr = ptr;
        TetPieceFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TetPieceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tetpiece_free(ptr);
    }
    /**
    * @returns {Direction}
    */
    get rotation() {
        const ret = wasm.__wbg_get_tetpiece_rotation(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {Direction} arg0
    */
    set rotation(arg0) {
        wasm.__wbg_set_tetpiece_rotation(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {Vec2}
    */
    get position() {
        const ret = wasm.__wbg_get_tetpiece_position(this.__wbg_ptr);
        return Vec2.__wrap(ret);
    }
    /**
    * @param {Vec2} arg0
    */
    set position(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_tetpiece_position(this.__wbg_ptr, ptr0);
    }
    /**
    * @param {PieceColor} color
    * @param {Direction} rotation
    * @param {Vec2} position
    */
    constructor(color, rotation, position) {
        _assertClass(position, Vec2);
        var ptr0 = position.__destroy_into_raw();
        const ret = wasm.tetpiece_new(color, rotation, ptr0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {TetPiece}
    */
    static z() {
        const ret = wasm.tetpiece_z();
        return TetPiece.__wrap(ret);
    }
    /**
    * @returns {TetPiece}
    */
    static i() {
        const ret = wasm.tetpiece_i();
        return TetPiece.__wrap(ret);
    }
    /**
    * @returns {TetPiece}
    */
    static j() {
        const ret = wasm.tetpiece_j();
        return TetPiece.__wrap(ret);
    }
    /**
    * @returns {TetPiece}
    */
    static l() {
        const ret = wasm.tetpiece_l();
        return TetPiece.__wrap(ret);
    }
    /**
    * @returns {TetPiece}
    */
    static o() {
        const ret = wasm.tetpiece_o();
        return TetPiece.__wrap(ret);
    }
    /**
    * @returns {TetPiece}
    */
    static t() {
        const ret = wasm.tetpiece_t();
        return TetPiece.__wrap(ret);
    }
    /**
    * @returns {TetPiece}
    */
    static s() {
        const ret = wasm.tetpiece_s();
        return TetPiece.__wrap(ret);
    }
    /**
    * @param {number} force
    */
    applyGravity(force) {
        wasm.tetpiece_applyGravity(this.__wbg_ptr, force);
    }
    /**
    * @returns {TetPiece}
    */
    clone() {
        const ret = wasm.tetpiece_clone(this.__wbg_ptr);
        return TetPiece.__wrap(ret);
    }
    /**
    * @param {number} amount
    */
    moveLeft(amount) {
        wasm.tetpiece_moveLeft(this.__wbg_ptr, amount);
    }
    /**
    * @param {number} amount
    */
    moveRight(amount) {
        wasm.tetpiece_moveRight(this.__wbg_ptr, amount);
    }
    /**
    * @returns {Array<any>}
    */
    getRawMinos() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.tetpiece_getRawMinos(ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Array<any>}
    */
    getMinos() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.tetpiece_getMinos(ptr);
        return takeObject(ret);
    }
    /**
    * @returns {PieceColor}
    */
    get color() {
        const ret = wasm.tetpiece_color(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {PieceColor} color
    */
    set color(color) {
        wasm.tetpiece_set_color(this.__wbg_ptr, color);
    }
}

const Vec2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vec2_free(ptr >>> 0));
/**
*/
export class Vec2 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Vec2.prototype);
        obj.__wbg_ptr = ptr;
        Vec2Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Vec2Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vec2_free(ptr);
    }
    /**
    * @returns {number}
    */
    get 0() {
        const ret = wasm.__wbg_get_vec2_0(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set 0(arg0) {
        wasm.__wbg_set_vec2_0(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get 1() {
        const ret = wasm.__wbg_get_vec2_1(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set 1(arg0) {
        wasm.__wbg_set_vec2_1(this.__wbg_ptr, arg0);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    constructor(x, y) {
        const ret = wasm.vec2_new(x, y);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
}

const u64_boardFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_u64_board_free(ptr >>> 0));
/**
*
* * lowest 40 bits represent 10x4 board state
* * example:
* * 0b0000001111_0000000111_0000011111_0000001111
* * on multiple lines this will look like
* * 0b0000001111
* *   0000000111
* *   0000011111
* *   0000000111
* *
*
*/
export class u64_board {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        u64_boardFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_u64_board_free(ptr);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = getObject(arg0);
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbg_vec2_new = function(arg0) {
        const ret = Vec2.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_in = function(arg0, arg1) {
        const ret = getObject(arg0) in getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_is_bigint = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'bigint';
        return ret;
    };
    imports.wbg.__wbindgen_bigint_from_u64 = function(arg0) {
        const ret = BigInt.asUintN(64, arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
        const ret = getObject(arg0) === getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
        const ret = getObject(arg0) == getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getwithrefkey_15c62c2b8546208d = function(arg0, arg1) {
        const ret = getObject(arg0)[getObject(arg1)];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_20cbc34131e76824 = function(arg0, arg1, arg2) {
        getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
    };
    imports.wbg.__wbg_decodefumenerror_new = function(arg0) {
        const ret = DecodeFumenError.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_page_new = function(arg0) {
        const ret = Page.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_0ee8ea3c7c984c45 = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_161c0d89c6535c1d = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_new_75208e29bddfd88c = function() {
        const ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbg_next_586204376d2ed373 = function(arg0) {
        const ret = getObject(arg0).next;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_b2d3366343a208b3 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_done_90b14d6f6eacc42f = function(arg0) {
        const ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_3158be908c80a75e = function(arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_iterator_40027cdd598da26b = function() {
        const ret = Symbol.iterator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_3fddfed2c83f434c = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_3f093dd26d5569f8 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_632630b5cec17f21 = function() {
        const ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_79c308ecd9a1d091 = function(arg0, arg1, arg2) {
        getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
    };
    imports.wbg.__wbg_from_58c79ccfb68060f5 = function(arg0) {
        const ret = Array.from(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_isArray_e783c41d0dd19b44 = function(arg0) {
        const ret = Array.isArray(getObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_push_0239ee92f127e807 = function(arg0, arg1) {
        const ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_9221fa854ffb71b5 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_isSafeInteger_a23a66ee7c41b273 = function(arg0) {
        const ret = Number.isSafeInteger(getObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_entries_488960b196cfb6a5 = function(arg0) {
        const ret = Object.entries(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_b914fb8b50ebbc3e = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_0de9ee56e9f6ee6e = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_b1f2d6842d615181 = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_7d988c98e6ced92d = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_21c4b0ae73cba59d = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_c299a4ee232e76ba = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Uint8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
        const v = getObject(arg1);
        const ret = typeof(v) === 'bigint' ? v : undefined;
        getBigInt64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? BigInt(0) : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedBigInt64Memory0 = null;
    cachedFloat64Memory0 = null;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('rust_tetro_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync }
export default __wbg_init;
