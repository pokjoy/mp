import { SignJWT, jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

/**
 * 签发 JWT 访问令牌
 * @param payload 自定义字段，至少应包含 slug 和 exp（秒后过期）
 */
export async function signToken(payload: { slug: string; type: string; exp: number }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(payload.exp)
    .sign(SECRET)
}

/**
 * 验证并解析 JWT；验证失败会抛错
 * @param token JWT 字符串
 */
export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, SECRET)
  return payload as { slug: string; type: string; exp: number }
}
