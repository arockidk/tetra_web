/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function pieceColorFromInt(a: number): number;
export function pieceColorFromStr(a: number, b: number): number;
export function pieceColorToChar(a: number): number;
export function direction_to_i8(a: number): number;
export function direction_to_i32(a: number): number;
export function direction_to_i64(a: number): number;
export function __wbg_tetpiece_free(a: number): void;
export function __wbg_get_tetpiece_rotation(a: number): number;
export function __wbg_set_tetpiece_rotation(a: number, b: number): void;
export function __wbg_get_tetpiece_position(a: number): number;
export function __wbg_set_tetpiece_position(a: number, b: number): void;
export function tetpiece_new(a: number, b: number, c: number): number;
export function tetpiece_z(): number;
export function tetpiece_i(): number;
export function tetpiece_j(): number;
export function tetpiece_l(): number;
export function tetpiece_o(): number;
export function tetpiece_t(): number;
export function tetpiece_s(): number;
export function tetpiece_applyGravity(a: number, b: number): void;
export function tetpiece_clone(a: number): number;
export function tetpiece_moveLeft(a: number, b: number): void;
export function tetpiece_moveRight(a: number, b: number): void;
export function tetpiece_getRawMinos(a: number): number;
export function tetpiece_getMinos(a: number): number;
export function tetpiece_color(a: number): number;
export function tetpiece_set_color(a: number, b: number): void;
export function __wbg_vec2_free(a: number): void;
export function __wbg_get_vec2_0(a: number): number;
export function __wbg_set_vec2_0(a: number, b: number): void;
export function __wbg_get_vec2_1(a: number): number;
export function __wbg_set_vec2_1(a: number, b: number): void;
export function vec2_new(a: number, b: number): number;
export function __wbg_tetpage_free(a: number): void;
export function __wbg_get_tetpage_rise(a: number): number;
export function __wbg_set_tetpage_rise(a: number, b: number): void;
export function __wbg_get_tetpage_lock(a: number): number;
export function __wbg_set_tetpage_lock(a: number, b: number): void;
export function __wbg_get_tetpage_mirror(a: number): number;
export function __wbg_set_tetpage_mirror(a: number, b: number): void;
export function __wbg_tetfumen_free(a: number): void;
export function __wbg_get_tetfumen_guideline(a: number): number;
export function __wbg_set_tetfumen_guideline(a: number, b: number): void;
export function tetpage_set_piece_color(a: number, b: number): void;
export function tetpage_set_piece_rotation(a: number, b: number): void;
export function tetpage_set_piece_position(a: number, b: number): void;
export function tetpage_set_field(a: number, b: number): void;
export function tetpage_set_comment(a: number, b: number, c: number): void;
export function tetpage_field(a: number): number;
export function tetpage_fumen_page(a: number): number;
export function tetpage_comment(a: number, b: number): void;
export function tetpage_from_fumen_page(a: number): number;
export function tetfumen_new(): number;
export function tetfumen_addPage(a: number): number;
export function tetfumen_update(a: number): void;
export function tetfumen_encodeFumen(a: number, b: number): void;
export function tetfumen_decodeFumen(a: number, b: number, c: number): void;
export function tetfumen_getPageAt(a: number, b: number): number;
export function __wbg_action_free(a: number): void;
export function __wbg_get_action_0(a: number): number;
export function __wbg_set_action_0(a: number, b: number): void;
export function action_get_left(a: number): number;
export function action_get_right(a: number): number;
export function action_get_soft_drop(a: number): number;
export function action_get_hard_drop(a: number): number;
export function action_get_counter_clockwise(a: number): number;
export function action_get_clockwise(a: number): number;
export function action_get_hold(a: number): number;
export function action_get_180_rotation(a: number): number;
export function action_set_left(a: number, b: number): void;
export function action_set_right(a: number, b: number): void;
export function action_set_soft_drop(a: number, b: number): void;
export function action_set_hard_drop(a: number, b: number): void;
export function action_set_counter_clockwise(a: number, b: number): void;
export function action_set_clockwise(a: number, b: number): void;
export function action_set_hold(a: number, b: number): void;
export function action_set_180_rotation(a: number, b: number): void;
export function __wbg_queuenode_free(a: number): void;
export function __wbg_get_queuenode_node_type(a: number): number;
export function __wbg_set_queuenode_node_type(a: number, b: number): void;
export function queuenode_js_new(a: number, b: number, c: number, d: number): number;
export function queuenode_js_choose(a: number): number;
export function queuenode_piece(a: number): number;
export function __wbg_queue_free(a: number): void;
export function queue_new(): number;
export function queue_at(a: number, b: number): number;
export function queue_mut_at(a: number, b: number): number;
export function queue_append(a: number, b: number): void;
export function queue_pushBack(a: number, b: number): void;
export function queue_popBack(a: number, b: number): void;
export function queue_pushFront(a: number, b: number): void;
export function queue_popFront(a: number, b: number): void;
export function queue_head(a: number): number;
export function queue_fromString(a: number, b: number): number;
export function queue_insertPiece(a: number, b: number): void;
export function queue_takeNextPiece(a: number): number;
export function queue_len(a: number): number;
export function __wbg_u64_board_free(a: number): void;
export function __wbg_field_free(a: number): void;
export function __wbg_get_field_board(a: number): number;
export function __wbg_set_field_board(a: number, b: number): void;
export function __wbg_get_field_active_piece(a: number): number;
export function __wbg_set_field_active_piece(a: number, b: number): void;
export function __wbg_get_field_hold(a: number): number;
export function __wbg_set_field_hold(a: number, b: number): void;
export function field_new(a: number, b: number, c: number): number;
export function field_canPlaceActivePiece(a: number): number;
export function field_applyGravity(a: number, b: number): number;
export function field_moveLeft(a: number, b: number): number;
export function field_moveRight(a: number, b: number): number;
export function field_dasPiece(a: number, b: number, c: number): number;
export function field_rotatePiece(a: number, b: number): void;
export function field_getTile(a: number, b: number, c: number): number;
export function field_setTile(a: number, b: number, c: number, d: number): void;
export function field_place_active_piece(a: number): number;
export function field_place_n_clear_active_piece(a: number): number;
export function field_checkPC(a: number): number;
export function field_checkTSpin(a: number): number;
export function __wbg_clearstruct_free(a: number): void;
export function __wbg_get_clearstruct_0(a: number): number;
export function __wbg_set_clearstruct_0(a: number, b: number): void;
export function clearstruct_getLines(a: number, b: number): void;
export function __wbg_tetboard_free(a: number): void;
export function __wbg_get_tetboard_height(a: number): number;
export function __wbg_set_tetboard_height(a: number, b: number): void;
export function __wbg_get_tetboard_width(a: number): number;
export function __wbg_set_tetboard_width(a: number, b: number): void;
export function tetboard_new(): number;
export function tetboard_tileOccupied(a: number, b: number, c: number): number;
export function tetboard_getTile(a: number, b: number, c: number): number;
export function tetboard_setTile(a: number, b: number, c: number, d: number): void;
export function tetboard_clearTile(a: number, b: number, c: number): void;
export function tetboard_fromIntArray(a: number): number;
export function tetboard_from4hArray(a: number): number;
export function tetboard_doesCollide(a: number, b: number): number;
export function tetboard_inBounds(a: number, b: number): number;
export function tetboard_rotatePiece(a: number, b: number, c: number): number;
export function tetboard_dasPiece(a: number, b: number, c: number, d: number): number;
export function tetboard_canPlace(a: number, b: number): number;
export function tetboard_getTileArray(a: number): number;
export function tetboard_getTileMatrix(a: number): number;
export function tetboard_applyGravity(a: number, b: number, c: number): number;
export function tetboard_moveLeft(a: number, b: number, c: number): number;
export function tetboard_moveRight(a: number, b: number, c: number): number;
export function tetboard_get_filled_rows(a: number, b: number): void;
export function tetboard_clearRow(a: number, b: number): void;
export function tetboard_unplace(a: number, b: number): number;
export function tetboard_checkPC(a: number): number;
export function tetboard_checkTSpin(a: number, b: number): number;
export function tetboard_place(a: number, b: number): number;
export function tetboard_placeNClear(a: number, b: number): number;
export function __wbg_fumen_free(a: number): void;
export function __wbg_get_fumen_guideline(a: number): number;
export function __wbg_set_fumen_guideline(a: number, b: number): void;
export function __wbg_page_free(a: number): void;
export function __wbg_get_page_piece(a: number): number;
export function __wbg_set_page_piece(a: number, b: number): void;
export function __wbg_get_page_rise(a: number): number;
export function __wbg_set_page_rise(a: number, b: number): void;
export function __wbg_get_page_mirror(a: number): number;
export function __wbg_set_page_mirror(a: number, b: number): void;
export function __wbg_get_page_lock(a: number): number;
export function __wbg_set_page_lock(a: number, b: number): void;
export function __wbg_piece_free(a: number): void;
export function __wbg_get_piece_kind(a: number): number;
export function __wbg_set_piece_kind(a: number, b: number): void;
export function __wbg_get_piece_rotation(a: number): number;
export function __wbg_set_piece_rotation(a: number, b: number): void;
export function __wbg_get_piece_x(a: number): number;
export function __wbg_set_piece_x(a: number, b: number): void;
export function __wbg_get_piece_y(a: number): number;
export function __wbg_set_piece_y(a: number, b: number): void;
export function fumen_new(): number;
export function fumen_encode(a: number, b: number): void;
export function fumen_decode(a: number, b: number, c: number): void;
export function fumen_addPage(a: number): number;
export function fumen_pages(a: number): number;
export function page_nextPage(a: number): number;
export function page_comment(a: number, b: number): void;
export function page_field(a: number): number;
export function page_garbage_row(a: number): number;
export function page_set_comment(a: number, b: number, c: number): void;
export function page_set_field(a: number, b: number): void;
export function page_set_garbage_row(a: number, b: number): void;
export function __wbg_decodefumenerror_free(a: number): void;
export function __wbindgen_malloc(a: number, b: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number, d: number): number;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function __wbindgen_free(a: number, b: number, c: number): void;
export function __wbindgen_exn_store(a: number): void;
