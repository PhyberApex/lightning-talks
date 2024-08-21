// Extending library interfaces (e.g., jQuery)
interface JQuery {
  t(key: string): string;
}

interface JQueryStatic {
  i18n: {
    t(key: string): string;
  };
}

const translateElement = ($element: JQuery<HTMLElement>) => {
  $element.find('#someId');
  $element.t('hello.world');
}

const translate = ($: JQueryStatic) => {
  $.i18n.t('hello.world');
}
