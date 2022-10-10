import superagent from "superagent";

export async function urlChecker(url, enc, push, done) {
  if (!url) {
    return done();
  }

  try {
    await superagent.head(url, { timeout: 5000 });
    push(`${url} | OK\n`);
  } catch (err) {
    push(`${url} | NOT OK\n`);
  }

  done();
}
