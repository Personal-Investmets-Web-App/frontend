import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    NEXT_PUBLIC_BACKEND_URL: z.string(),
  },
  runtimeEnv: process.env,
});