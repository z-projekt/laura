export class FormattingUtils {
  public static time(seconds: number) {
    const pad = (secs: number) => {
      return (secs < 10 ? "0" : "") + secs;
    };

    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secondss = Math.floor(seconds % 60);

    return pad(hours) + ":" + pad(minutes) + ":" + pad(secondss);
  }
}
