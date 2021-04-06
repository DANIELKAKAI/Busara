export const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua,
    )
  ) {
    return 'mobile';
  }
  return 'desktop';
};

const ENDPOINT = 'http://104.248.0.49';

export const SIGNUP_URL = `${ENDPOINT}/api/v1/users/registration/`;

export const LOGIN_URL = `${ENDPOINT}/api/v1/oauth/token/`;

export const FORM_URL = `${ENDPOINT}/api/v1/recruitment/forms/?node_type=Both`;

export const SUBMIT_URL = `${ENDPOINT}/api/v1/recruitment/answers/submit/`;

export const USER_URL = `${ENDPOINT}/api/v1/users/current-user`;

export const ClientId = 'pw5ExLyIcOnxF3B0wna1m7qqHlKVvrB2VFHGtyHB';

export const ClientSecret = 'xqsESmmZxlwGokFuqQTigIwF3hyIWykudx6TCKseGeQIVlSApmscBNlugvfEUO7jh1HJUdXQTreYXJ93nayBjX4jlb8Zzxr4sxJXxJFHRQsMncxtoeUZwwNihdzBB039';
