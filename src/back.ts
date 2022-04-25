import Koa from "koa";
import config from "./config";
import bodyParser from "koa-bodyparser";

export function setupBackService(app: Koa) {
    app.use(bodyParser());

    app.use(async (ctx, next) => {
        if (ctx.path.startsWith("/back")) {
            const { minProcessingMS, maxProcessingMS } = config.back;
            const processingTime =
                minProcessingMS +
                Math.random() * (maxProcessingMS - minProcessingMS);
            await sleep(processingTime);
            ctx.body = ctx.request.body;

            const body = String(ctx.body);
            ctx.set("content-type", "text/plain");
            ctx.body = `Processed: ${body.substr(
                0,
                50
            )}... in ${processingTime.toPrecision(4)}ms.`;
        }
        return next();
    });
}

function sleep(millis: number) {
    return new Promise((resolve) => setTimeout(resolve, millis));
}
