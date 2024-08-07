import type { Context, TransformOptions } from "./types";
import { getCache } from "./cache";
import { debug } from "./utils";

export function transform(ctx: Context, topts: TransformOptions): string {
  let code = getCache(ctx, topts.filename, topts.source, topts.async, () => {
    const res = ctx.opts.transform!({
      ...ctx.opts.transformOptions,
      babel: {
        ...(ctx.opts.sourceMaps
          ? {
              sourceFileName: topts.filename,
              sourceMaps: "inline",
            }
          : {}),
        ...ctx.opts.transformOptions?.babel,
      },
      ...topts,
    });
    if (res.error && ctx.opts.debug) {
      debug(ctx, res.error);
    }
    return res.code;
  });
  if (code.startsWith("#!")) {
    code = "// " + code;
  }
  return code;
}
