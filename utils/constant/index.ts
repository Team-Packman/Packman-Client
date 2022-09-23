export const KAKAO_HREF = `https://kauth.kakao.com/oauth/authorize?client_id=${
  process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
}&redirect_uri=${encodeURI(process.env.NEXT_PUBLIC_REDIRECT ?? '')}&response_type=code`;

export const googleTagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || '';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
