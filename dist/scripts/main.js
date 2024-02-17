import init, * as tet from '/scripts/pkg/rs_tetris_utils.js';
async function run() {
    await init();
    let tetra = {
        'field': new tet.Field(new tet.Board()),
        'queue': new tet.Queue(),
        'score': 0,
        'free': tet.Tetra.prototype.free
    };
}
run();
