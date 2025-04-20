import { Ratelimit } from "@upstash/ratelimit"

import { redis } from "@/lib/redis"
import { RATELIMIT_DURATION, RATELIMT_TOKENS } from "@/lib/constants"

export const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(RATELIMT_TOKENS, RATELIMIT_DURATION),
})