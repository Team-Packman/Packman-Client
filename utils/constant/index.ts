export const KAKAO_HREF = `https://kauth.kakao.com/oauth/authorize?client_id=${
  process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
}&redirect_uri=${encodeURI(process.env.NEXT_PUBLIC_REDIRECT ?? '')}&response_type=code`;

export const PRIVACY_POLICY = 'https://www.notion.so/c9e91c3d19554ef7a01737d3fba6e102';
export const TEMRS_OF_SERVICE = 'https://www.notion.so/99197c3491fe477ea9d69ed131cf4087';

export const googleTagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || '';
export const optimizeId = process.env.NEXT_PUBLIC_GOOGLE_OPTIMIZE_ID || '';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
