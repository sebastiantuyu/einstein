const routes = require ("./routes")

function APIRouter(app: any) {
    app.use('/api', routes);
}

module.exports = APIRouter;