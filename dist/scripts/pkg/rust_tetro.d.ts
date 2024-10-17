/* tslint:disable */
/* eslint-disable */
/**
* @param {number} int
* @returns {PieceColor}
*/
export function pieceColorFromInt(int: number): PieceColor;
/**
* @param {string} str
* @returns {PieceColor}
*/
export function pieceColorFromStr(str: string): PieceColor;
/**
* @param {PieceColor} color
* @returns {string}
*/
export function pieceColorToChar(color: PieceColor): string;
/**
* @param {Direction} dir
* @returns {number}
*/
export function direction_to_i8(dir: Direction): number;
/**
* @param {Direction} dir
* @returns {number}
*/
export function direction_to_i32(dir: Direction): number;
/**
* @param {Direction} dir
* @returns {bigint}
*/
export function direction_to_i64(dir: Direction): bigint;
/**
*/
export enum QueueNodeType {
  Choose = 0,
  Piece = 1,
}
/**
*/
export enum CellColor {
  Empty = 0,
  I = 1,
  L = 2,
  O = 3,
  Z = 4,
  T = 5,
  J = 6,
  S = 7,
  Grey = 8,
}
/**
*/
export enum PieceColor {
  B = 0,
  I = 1,
  L = 2,
  O = 3,
  Z = 4,
  T = 5,
  J = 6,
  S = 7,
  G = 8,
}
/**
*/
export enum PieceType {
  I = 1,
  L = 2,
  O = 3,
  Z = 4,
  T = 5,
  J = 6,
  S = 7,
}
/**
*/
export enum Direction {
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}
/**
*/
export enum RotationState {
  South = 0,
  East = 1,
  North = 2,
  West = 3,
}
/**
*/
export enum TSpinResult {
  NoSpin = 0,
  MiniSpin = 1,
  TSpin = 2,
}
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
  free(): void;
/**
* @returns {boolean}
*/
  get_left(): boolean;
/**
* @returns {boolean}
*/
  get_right(): boolean;
/**
* @returns {boolean}
*/
  get_soft_drop(): boolean;
/**
* @returns {boolean}
*/
  get_hard_drop(): boolean;
/**
* @returns {boolean}
*/
  get_counter_clockwise(): boolean;
/**
* @returns {boolean}
*/
  get_clockwise(): boolean;
/**
* @returns {boolean}
*/
  get_hold(): boolean;
/**
* @returns {boolean}
*/
  get_180_rotation(): boolean;
/**
* @param {boolean} value
*/
  set_left(value: boolean): void;
/**
* @param {boolean} value
*/
  set_right(value: boolean): void;
/**
* @param {boolean} value
*/
  set_soft_drop(value: boolean): void;
/**
* @param {boolean} value
*/
  set_hard_drop(value: boolean): void;
/**
* @param {boolean} value
*/
  set_counter_clockwise(value: boolean): void;
/**
* @param {boolean} value
*/
  set_clockwise(value: boolean): void;
/**
* @param {boolean} value
*/
  set_hold(value: boolean): void;
/**
* @param {boolean} value
*/
  set_180_rotation(value: boolean): void;
/**
*/
  0: number;
}
/**
*/
export class Choose {
  free(): void;
/**
* @param {any[]} pieces
* @param {number} count
*/
  constructor(pieces: any[], count: number);
/**
* @returns {number}
*/
  size(): number;
/**
* @returns {(Queue)[]}
*/
  getQueues(): (Queue)[];
/**
* @param {string} s
* @returns {Choose | undefined}
*/
  static from_string(s: string): Choose | undefined;
/**
*
*     * Reorders the choose's pieces into TILJOSZ order. 
*     
*/
  sort(): void;
/**
*/
  count: number;
}
/**
*/
export class ClearStruct {
  free(): void;
/**
* @returns {Int32Array}
*/
  getLines(): Int32Array;
/**
*/
  0: boolean;
}
/**
*/
export class DecodeFumenError {
  free(): void;
}
/**
*/
export class Field {
  free(): void;
/**
* @param {TetBoard} board
* @param {TetPiece | undefined} [active_piece]
* @param {TetPiece | undefined} [hold]
*/
  constructor(board: TetBoard, active_piece?: TetPiece, hold?: TetPiece);
/**
* @param {TetBoard} board
* @returns {Field}
*/
  static fromBoard(board: TetBoard): Field;
/**
* @returns {boolean}
*/
  canPlaceActivePiece(): boolean;
/**
* @param {number} force
* @returns {boolean}
*/
  applyGravity(force: number): boolean;
/**
* @param {number} amount
* @returns {boolean}
*/
  moveLeft(amount: number): boolean;
/**
* @param {number} amount
* @returns {boolean}
*/
  moveRight(amount: number): boolean;
/**
* @param {Direction} direction
* @param {number} force
* @returns {number}
*/
  dasPiece(direction: Direction, force: number): number;
/**
* @param {number} rotation
*/
  rotatePiece(rotation: number): void;
/**
* @param {number} x
* @param {number} y
* @returns {number}
*/
  getTile(x: number, y: number): number;
/**
* @param {number} x
* @param {number} y
* @param {number} color
*/
  setTile(x: number, y: number, color: number): void;
/**
* @returns {boolean}
*/
  place_active_piece(): boolean;
/**
* @returns {ClearStruct}
*/
  place_n_clear_active_piece(): ClearStruct;
/**
* @returns {boolean}
*/
  checkPC(): boolean;
/**
* @returns {TSpinResult}
*/
  checkTSpin(): TSpinResult;
/**
*/
  active_piece?: TetPiece;
/**
*/
  board: TetBoard;
/**
*/
  hold?: TetPiece;
}
/**
*/
export class Fumen {
  free(): void;
/**
*/
  constructor();
/**
* Encode as a fumen data string.
* @returns {string}
*/
  encode(): string;
/**
* Decodes a fumen data string.
* 
* @param {string} data
* @returns {Fumen}
*/
  static decode(data: string): Fumen;
/**
* Create a new page, in the same way as creating a new page in fumen does.
*
* This will apply the piece locking, line clear, rise, and mirror rules just like fumen does.
* @returns {number}
*/
  addPage(): number;
/**
*/
  guideline: boolean;
/**
*/
  readonly pages: Array<any>;
}
/**
*/
export class Page {
  free(): void;
/**
* Create a page from this page in the same way as fumen does.
*
* This will apply the piece locking, line clear, rise, and mirror rules just like fumen does.
* @returns {Page}
*/
  nextPage(): Page;
/**
*/
  comment?: string;
/**
*/
  field: Array<any>;
/**
*/
  garbage_row: Array<any>;
/**
*/
  lock: boolean;
/**
*/
  mirror: boolean;
/**
*/
  piece?: Piece;
/**
*/
  rise: boolean;
}
/**
* Represents a tetromino piece using true rotation.
*/
export class Piece {
  free(): void;
/**
*/
  kind: PieceType;
/**
*/
  rotation: RotationState;
/**
*/
  x: number;
/**
* y-up
*/
  y: number;
}
/**
*/
export class Queue {
  free(): void;
/**
*/
  constructor();
/**
* @param {number} idx
* @returns {QueueNode | undefined}
*/
  at(idx: number): QueueNode | undefined;
/**
* @param {number} idx
* @returns {number}
*/
  mut_at(idx: number): number;
/**
* @param {Queue} queue
*/
  append(queue: Queue): void;
/**
* @param {any} node
*/
  pushBack(node: any): void;
/**
* @returns {any}
*/
  popBack(): any;
/**
* @param {any} node
*/
  pushFront(node: any): void;
/**
* @returns {any}
*/
  popFront(): any;
/**
* @returns {QueueNode}
*/
  head(): QueueNode;
/**
* @param {string} s
* @returns {Queue | undefined}
*/
  static fromString(s: string): Queue | undefined;
/**
* @param {PieceColor} piece
*/
  insertPiece(piece: PieceColor): void;
/**
* @returns {PieceColor | undefined}
*/
  takeNextPiece(): PieceColor | undefined;
/**
* @returns {number}
*/
  len(): number;
}
/**
*/
export class QueueNode {
  free(): void;
/**
* @param {QueueNodeType} node_type
* @param {any} choose
* @param {any} piece
* @param {any} next
*/
  constructor(node_type: QueueNodeType, choose: any, piece: any, next: any);
/**
*/
  readonly choose: any;
/**
*/
  node_type: QueueNodeType;
/**
*/
  readonly piece: PieceColor;
}
/**
*/
export class TetBoard {
  free(): void;
/**
*/
  constructor();
/**
* @param {number} x
* @param {number} y
* @returns {boolean}
*/
  tileOccupied(x: number, y: number): boolean;
/**
* @param {number} x
* @param {number} y
* @returns {number}
*/
  getTile(x: number, y: number): number;
/**
* @param {number} x
* @param {number} y
* @param {number} value
*/
  setTile(x: number, y: number, value: number): void;
/**
* @param {number} x
* @param {number} y
*/
  clearTile(x: number, y: number): void;
/**
* @param {Uint8Array} arr
* @returns {TetBoard}
*/
  static fromIntArray(arr: Uint8Array): TetBoard;
/**
* @param {Uint8Array} arr
* @returns {TetBoard}
*/
  static from4hArray(arr: Uint8Array): TetBoard;
/**
* @param {TetPiece} piece
* @returns {boolean}
*/
  doesCollide(piece: TetPiece): boolean;
/**
* @param {Vec2} pos
* @returns {boolean}
*/
  inBounds(pos: Vec2): boolean;
/**
* @param {TetPiece} piece
* @param {number} rotation
* @returns {boolean}
*/
  rotatePiece(piece: TetPiece, rotation: number): boolean;
/**
* @param {TetPiece} piece
* @param {Direction} direction
* @param {number} force
* @returns {number}
*/
  dasPiece(piece: TetPiece, direction: Direction, force: number): number;
/**
* @param {TetPiece} piece
* @returns {boolean}
*/
  canPlace(piece: TetPiece): boolean;
/**
* @returns {Uint8Array}
*/
  getTileArray(): Uint8Array;
/**
* @returns {Array<any>}
*/
  getTileMatrix(): Array<any>;
/**
* @param {TetPiece} piece
* @param {number} force
* @returns {boolean}
*/
  applyGravity(piece: TetPiece, force: number): boolean;
/**
* @param {TetPiece} piece
* @param {number} amount
* @returns {boolean}
*/
  moveLeft(piece: TetPiece, amount: number): boolean;
/**
* @param {TetPiece} piece
* @param {number} amount
* @returns {boolean}
*/
  moveRight(piece: TetPiece, amount: number): boolean;
/**
* @returns {Int32Array}
*/
  get_filled_rows(): Int32Array;
/**
* @param {number} row
*/
  clearRow(row: number): void;
/**
* @param {TetPiece} piece
* @returns {boolean}
*/
  unplace(piece: TetPiece): boolean;
/**
* @returns {boolean}
*/
  checkPC(): boolean;
/**
* @param {TetPiece} piece
* @returns {TSpinResult}
*/
  checkTSpin(piece: TetPiece): TSpinResult;
/**
* @param {TetPiece} piece
* @returns {boolean}
*/
  place(piece: TetPiece): boolean;
/**
* @param {TetPiece} piece
* @returns {ClearStruct}
*/
  placeNClear(piece: TetPiece): ClearStruct;
/**
* @returns {string}
*/
  noColorString(): string;
/**
*/
  height: number;
/**
*/
  width: number;
}
/**
*/
export class TetFumen {
  free(): void;
/**
*/
  constructor();
/**
* @param {string} code
* @returns {TetFumen}
*/
  static load(code: string): TetFumen;
/**
* @param {string} code
* @returns {TetFumen}
*/
  static loadSlice(code: string): TetFumen;
/**
* @returns {number}
*/
  len(): number;
/**
* @returns {number}
*/
  addPage(): number;
/**
*/
  update(): void;
/**
* @returns {string}
*/
  encodeFumen(): string;
/**
* @param {string} fumen
*/
  decodeFumen(fumen: string): void;
/**
* @param {number} idx
* @returns {TetPage}
*/
  getPageAt(idx: number): TetPage;
/**
*/
  guideline: boolean;
}
/**
*/
export class TetPage {
  free(): void;
/**
*/
  createBlankPiece(): void;
/**
* @param {Page} pg
* @returns {TetPage}
*/
  static fromFumenPage(pg: Page): TetPage;
/**
*/
  comment?: string | undefined;
/**
*/
  field: Field;
/**
*/
  readonly fumen_page: Page;
/**
*/
  lock: boolean;
/**
*/
  mirror: boolean;
/**
*/
  piece_color: PieceColor;
/**
*/
  piece_position: Vec2;
/**
*/
  piece_rotation: Direction;
/**
*/
  rise: boolean;
}
/**
*/
export class TetPiece {
  free(): void;
/**
* @param {PieceColor} color
* @param {Direction} rotation
* @param {Vec2} position
*/
  constructor(color: PieceColor, rotation: Direction, position: Vec2);
/**
* @returns {TetPiece}
*/
  static z(): TetPiece;
/**
* @returns {TetPiece}
*/
  static i(): TetPiece;
/**
* @returns {TetPiece}
*/
  static j(): TetPiece;
/**
* @returns {TetPiece}
*/
  static l(): TetPiece;
/**
* @returns {TetPiece}
*/
  static o(): TetPiece;
/**
* @returns {TetPiece}
*/
  static t(): TetPiece;
/**
* @returns {TetPiece}
*/
  static s(): TetPiece;
/**
* @param {number} force
*/
  applyGravity(force: number): void;
/**
* @returns {TetPiece}
*/
  clone(): TetPiece;
/**
* @param {number} amount
*/
  moveLeft(amount: number): void;
/**
* @param {number} amount
*/
  moveRight(amount: number): void;
/**
* @returns {Array<any>}
*/
  getRawMinos(): Array<any>;
/**
* @returns {Array<any>}
*/
  getMinos(): Array<any>;
/**
* @param {number} y
* @returns {boolean}
*/
  minoAbove(y: number): boolean;
/**
*/
  color: PieceColor;
/**
*/
  position: Vec2;
/**
*/
  rotation: Direction;
}
/**
*/
export class Vec2 {
  free(): void;
/**
* @param {number} x
* @param {number} y
*/
  constructor(x: number, y: number);
/**
*/
  0: number;
/**
*/
  1: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_tetpage_free: (a: number, b: number) => void;
  readonly __wbg_get_tetpage_rise: (a: number) => number;
  readonly __wbg_set_tetpage_rise: (a: number, b: number) => void;
  readonly __wbg_get_tetpage_lock: (a: number) => number;
  readonly __wbg_set_tetpage_lock: (a: number, b: number) => void;
  readonly __wbg_get_tetpage_mirror: (a: number) => number;
  readonly __wbg_set_tetpage_mirror: (a: number, b: number) => void;
  readonly __wbg_tetfumen_free: (a: number, b: number) => void;
  readonly __wbg_get_tetfumen_guideline: (a: number) => number;
  readonly __wbg_set_tetfumen_guideline: (a: number, b: number) => void;
  readonly tetpage_createBlankPiece: (a: number) => void;
  readonly tetpage_set_piece_color: (a: number, b: number) => void;
  readonly tetpage_set_piece_rotation: (a: number, b: number) => void;
  readonly tetpage_set_piece_position: (a: number, b: number) => void;
  readonly tetpage_set_field: (a: number, b: number) => void;
  readonly tetpage_set_comment: (a: number, b: number, c: number) => void;
  readonly tetpage_field: (a: number) => number;
  readonly tetpage_fumen_page: (a: number) => number;
  readonly tetpage_comment: (a: number, b: number) => void;
  readonly tetpage_fromFumenPage: (a: number) => number;
  readonly tetfumen_new: () => number;
  readonly tetfumen_load: (a: number, b: number) => number;
  readonly tetfumen_loadSlice: (a: number, b: number) => number;
  readonly tetfumen_len: (a: number) => number;
  readonly tetfumen_addPage: (a: number) => number;
  readonly tetfumen_update: (a: number) => void;
  readonly tetfumen_encodeFumen: (a: number, b: number) => void;
  readonly tetfumen_decodeFumen: (a: number, b: number, c: number) => void;
  readonly tetfumen_getPageAt: (a: number, b: number) => number;
  readonly __wbg_clearstruct_free: (a: number, b: number) => void;
  readonly __wbg_get_clearstruct_0: (a: number) => number;
  readonly __wbg_set_clearstruct_0: (a: number, b: number) => void;
  readonly clearstruct_getLines: (a: number, b: number) => void;
  readonly __wbg_tetboard_free: (a: number, b: number) => void;
  readonly __wbg_get_tetboard_height: (a: number) => number;
  readonly __wbg_set_tetboard_height: (a: number, b: number) => void;
  readonly __wbg_get_tetboard_width: (a: number) => number;
  readonly __wbg_set_tetboard_width: (a: number, b: number) => void;
  readonly tetboard_new: () => number;
  readonly tetboard_tileOccupied: (a: number, b: number, c: number) => number;
  readonly tetboard_getTile: (a: number, b: number, c: number) => number;
  readonly tetboard_setTile: (a: number, b: number, c: number, d: number) => void;
  readonly tetboard_clearTile: (a: number, b: number, c: number) => void;
  readonly tetboard_fromIntArray: (a: number) => number;
  readonly tetboard_from4hArray: (a: number) => number;
  readonly tetboard_doesCollide: (a: number, b: number) => number;
  readonly tetboard_inBounds: (a: number, b: number) => number;
  readonly tetboard_rotatePiece: (a: number, b: number, c: number) => number;
  readonly tetboard_dasPiece: (a: number, b: number, c: number, d: number) => number;
  readonly tetboard_canPlace: (a: number, b: number) => number;
  readonly tetboard_getTileArray: (a: number) => number;
  readonly tetboard_getTileMatrix: (a: number) => number;
  readonly tetboard_applyGravity: (a: number, b: number, c: number) => number;
  readonly tetboard_moveLeft: (a: number, b: number, c: number) => number;
  readonly tetboard_moveRight: (a: number, b: number, c: number) => number;
  readonly tetboard_get_filled_rows: (a: number, b: number) => void;
  readonly tetboard_clearRow: (a: number, b: number) => void;
  readonly tetboard_unplace: (a: number, b: number) => number;
  readonly tetboard_checkPC: (a: number) => number;
  readonly tetboard_checkTSpin: (a: number, b: number) => number;
  readonly tetboard_place: (a: number, b: number) => number;
  readonly tetboard_placeNClear: (a: number, b: number) => number;
  readonly tetboard_noColorString: (a: number, b: number) => void;
  readonly __wbg_field_free: (a: number, b: number) => void;
  readonly __wbg_get_field_board: (a: number) => number;
  readonly __wbg_set_field_board: (a: number, b: number) => void;
  readonly __wbg_get_field_active_piece: (a: number) => number;
  readonly __wbg_set_field_active_piece: (a: number, b: number) => void;
  readonly __wbg_get_field_hold: (a: number) => number;
  readonly __wbg_set_field_hold: (a: number, b: number) => void;
  readonly field_new: (a: number, b: number, c: number) => number;
  readonly field_fromBoard: (a: number) => number;
  readonly field_canPlaceActivePiece: (a: number) => number;
  readonly field_applyGravity: (a: number, b: number) => number;
  readonly field_moveLeft: (a: number, b: number) => number;
  readonly field_moveRight: (a: number, b: number) => number;
  readonly field_dasPiece: (a: number, b: number, c: number) => number;
  readonly field_rotatePiece: (a: number, b: number) => void;
  readonly field_getTile: (a: number, b: number, c: number) => number;
  readonly field_setTile: (a: number, b: number, c: number, d: number) => void;
  readonly field_place_active_piece: (a: number) => number;
  readonly field_place_n_clear_active_piece: (a: number) => number;
  readonly field_checkPC: (a: number) => number;
  readonly field_checkTSpin: (a: number) => number;
  readonly __wbg_vec2_free: (a: number, b: number) => void;
  readonly __wbg_get_vec2_0: (a: number) => number;
  readonly __wbg_set_vec2_0: (a: number, b: number) => void;
  readonly __wbg_get_vec2_1: (a: number) => number;
  readonly __wbg_set_vec2_1: (a: number, b: number) => void;
  readonly vec2_new: (a: number, b: number) => number;
  readonly __wbg_action_free: (a: number, b: number) => void;
  readonly __wbg_get_action_0: (a: number) => number;
  readonly __wbg_set_action_0: (a: number, b: number) => void;
  readonly action_get_left: (a: number) => number;
  readonly action_get_right: (a: number) => number;
  readonly action_get_soft_drop: (a: number) => number;
  readonly action_get_hard_drop: (a: number) => number;
  readonly action_get_counter_clockwise: (a: number) => number;
  readonly action_get_clockwise: (a: number) => number;
  readonly action_get_hold: (a: number) => number;
  readonly action_get_180_rotation: (a: number) => number;
  readonly action_set_180_rotation: (a: number, b: number) => void;
  readonly action_set_right: (a: number, b: number) => void;
  readonly action_set_soft_drop: (a: number, b: number) => void;
  readonly action_set_left: (a: number, b: number) => void;
  readonly action_set_hard_drop: (a: number, b: number) => void;
  readonly action_set_counter_clockwise: (a: number, b: number) => void;
  readonly action_set_hold: (a: number, b: number) => void;
  readonly action_set_clockwise: (a: number, b: number) => void;
  readonly __wbg_queuenode_free: (a: number, b: number) => void;
  readonly __wbg_get_queuenode_node_type: (a: number) => number;
  readonly __wbg_set_queuenode_node_type: (a: number, b: number) => void;
  readonly queuenode_js_new: (a: number, b: number, c: number, d: number) => number;
  readonly queuenode_js_choose: (a: number) => number;
  readonly queuenode_piece: (a: number) => number;
  readonly __wbg_queue_free: (a: number, b: number) => void;
  readonly queue_new: () => number;
  readonly queue_at: (a: number, b: number) => number;
  readonly queue_mut_at: (a: number, b: number) => number;
  readonly queue_append: (a: number, b: number) => void;
  readonly queue_pushBack: (a: number, b: number) => void;
  readonly queue_popBack: (a: number, b: number) => void;
  readonly queue_pushFront: (a: number, b: number) => void;
  readonly queue_popFront: (a: number, b: number) => void;
  readonly queue_head: (a: number) => number;
  readonly queue_fromString: (a: number, b: number) => number;
  readonly queue_insertPiece: (a: number, b: number) => void;
  readonly queue_takeNextPiece: (a: number) => number;
  readonly queue_len: (a: number) => number;
  readonly __wbg_choose_free: (a: number, b: number) => void;
  readonly __wbg_get_choose_count: (a: number) => number;
  readonly __wbg_set_choose_count: (a: number, b: number) => void;
  readonly choose_new: (a: number, b: number, c: number) => number;
  readonly choose_size: (a: number) => number;
  readonly choose_getQueues: (a: number, b: number) => void;
  readonly choose_from_string: (a: number, b: number) => number;
  readonly choose_sort: (a: number) => void;
  readonly pieceColorFromInt: (a: number) => number;
  readonly pieceColorFromStr: (a: number, b: number) => number;
  readonly pieceColorToChar: (a: number) => number;
  readonly direction_to_i32: (a: number) => number;
  readonly direction_to_i64: (a: number) => number;
  readonly __wbg_tetpiece_free: (a: number, b: number) => void;
  readonly __wbg_get_tetpiece_rotation: (a: number) => number;
  readonly __wbg_set_tetpiece_rotation: (a: number, b: number) => void;
  readonly __wbg_get_tetpiece_position: (a: number) => number;
  readonly __wbg_set_tetpiece_position: (a: number, b: number) => void;
  readonly tetpiece_new: (a: number, b: number, c: number) => number;
  readonly tetpiece_z: () => number;
  readonly tetpiece_i: () => number;
  readonly tetpiece_j: () => number;
  readonly tetpiece_l: () => number;
  readonly tetpiece_o: () => number;
  readonly tetpiece_t: () => number;
  readonly tetpiece_s: () => number;
  readonly tetpiece_applyGravity: (a: number, b: number) => void;
  readonly tetpiece_clone: (a: number) => number;
  readonly tetpiece_moveLeft: (a: number, b: number) => void;
  readonly tetpiece_moveRight: (a: number, b: number) => void;
  readonly tetpiece_getRawMinos: (a: number) => number;
  readonly tetpiece_getMinos: (a: number) => number;
  readonly tetpiece_color: (a: number) => number;
  readonly tetpiece_set_color: (a: number, b: number) => void;
  readonly tetpiece_minoAbove: (a: number, b: number) => number;
  readonly direction_to_i8: (a: number) => number;
  readonly __wbg_fumen_free: (a: number, b: number) => void;
  readonly __wbg_get_fumen_guideline: (a: number) => number;
  readonly __wbg_set_fumen_guideline: (a: number, b: number) => void;
  readonly __wbg_page_free: (a: number, b: number) => void;
  readonly __wbg_get_page_piece: (a: number) => number;
  readonly __wbg_set_page_piece: (a: number, b: number) => void;
  readonly __wbg_get_page_rise: (a: number) => number;
  readonly __wbg_set_page_rise: (a: number, b: number) => void;
  readonly __wbg_get_page_mirror: (a: number) => number;
  readonly __wbg_set_page_mirror: (a: number, b: number) => void;
  readonly __wbg_get_page_lock: (a: number) => number;
  readonly __wbg_set_page_lock: (a: number, b: number) => void;
  readonly __wbg_piece_free: (a: number, b: number) => void;
  readonly __wbg_get_piece_kind: (a: number) => number;
  readonly __wbg_set_piece_kind: (a: number, b: number) => void;
  readonly __wbg_get_piece_rotation: (a: number) => number;
  readonly __wbg_set_piece_rotation: (a: number, b: number) => void;
  readonly __wbg_get_piece_x: (a: number) => number;
  readonly __wbg_set_piece_x: (a: number, b: number) => void;
  readonly __wbg_get_piece_y: (a: number) => number;
  readonly __wbg_set_piece_y: (a: number, b: number) => void;
  readonly fumen_new: () => number;
  readonly fumen_encode: (a: number, b: number) => void;
  readonly fumen_decode: (a: number, b: number, c: number) => void;
  readonly fumen_addPage: (a: number) => number;
  readonly fumen_pages: (a: number) => number;
  readonly page_nextPage: (a: number) => number;
  readonly page_comment: (a: number, b: number) => void;
  readonly page_field: (a: number) => number;
  readonly page_garbage_row: (a: number) => number;
  readonly page_set_comment: (a: number, b: number, c: number) => void;
  readonly page_set_field: (a: number, b: number) => void;
  readonly page_set_garbage_row: (a: number, b: number) => void;
  readonly __wbg_decodefumenerror_free: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
