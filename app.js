var express = require('express');
var app =express();
const joi=require("joi");

app.use(express.json())
var customer_routes=require('./router/customerroutes')
var SP_routes=require('./router/sproutes')
var admin_routes=require('./router/adminroutes')
const swaggerDocument=require('./swagger');
const swagger=require('swagger-ui-express');
app.use('/swagger',swagger.serve,swagger.setup(swaggerDocument));



app.use("/customer",customer_routes);
app.use("/SP",SP_routes);
app.use("/admin",admin_routes);






app.listen(3097);
