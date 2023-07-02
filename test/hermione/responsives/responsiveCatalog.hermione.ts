describe('Тестирование адаптивности страницы каталога', () => {
  it('Верная верстка при ширине больше или равной 1400', async function() {
    await this.browser.setWindowSize(1400, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    const [ page ] = await (await this.browser.getPuppeteer()).pages()
    const el = await this.browser.$('.Catalog > .row:nth-child(2)')
    await this.browser.assertView('plain', 'body', {ignoreElements: [
        'nav.navbar',
        '.Catalog > .row:nth-child(2) > *:nth-child(n + 5)'
      ],
    selectorToScroll: '.Catalog > .row:nth-child(2) > *:nth-child(5)'});
  });
  it('Верная верстка при ширине больше или равной 1200', async function() {
    await this.browser.setWindowSize(1200, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    await this.browser.assertView('plain', 'body', {ignoreElements: [
        'nav.navbar',
        '.Catalog > .row:nth-child(2) > *:nth-child(n + 5)'
      ],
    selectorToScroll: '.Catalog > .row:nth-child(2) > *:nth-child(5)'});
  });
  it('Верная верстка при ширине больше или равной 992', async function() {
    await this.browser.setWindowSize(992, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    await this.browser.assertView('plain', 'body', {ignoreElements: [
        'nav.navbar',
        '.Catalog > .row:nth-child(2) > *:nth-child(n + 5)'
      ],
    selectorToScroll: '.Catalog > .row:nth-child(2) > *:nth-child(5)'});
  });
  it('Верная верстка при ширине больше или равной 768', async function() {
    await this.browser.setWindowSize(768, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    await this.browser.assertView('plain', 'body', {ignoreElements: [
        'nav.navbar',
        '.Catalog > .row:nth-child(2) > *:nth-child(n + 5)'
      ],
    selectorToScroll: '.Catalog > .row:nth-child(2) > *:nth-child(5)'});
  });
  it('Верная верстка при ширине больше или равной 576', async function() {
    await this.browser.setWindowSize(576, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    await this.browser.assertView('plain', 'body', {ignoreElements: [
        'nav.navbar',
        '.Catalog > .row:nth-child(2) > *:nth-child(n + 5)'
      ],
    selectorToScroll: '.Catalog > .row:nth-child(2) > *:nth-child(5)'});
  });
  it('Верная верстка при ширине меньше 576', async function() {
    await this.browser.setWindowSize(570, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    await this.browser.assertView('plain', 'body', {ignoreElements: [
        'nav.navbar',
        '.Catalog > .row:nth-child(2) > *:nth-child(n + 5)'
      ],
    selectorToScroll: '.Catalog > .row:nth-child(2) > *:nth-child(5)'});
  });
})