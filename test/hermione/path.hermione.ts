describe('Тестирование доступности путей', () => {
  it('Доступен путь главной страницы', async function () {
    const [page] = await (await this.browser.getPuppeteer()).pages()
    const res = await page.goto('http://localhost:3000/hw/store')
    expect(await res.statusText() !== '404').toBeTruthy()
  });
  it('Доступен путь каталога', async function () {
    const [page] = await (await this.browser.getPuppeteer()).pages()
    const res = await page.goto('http://localhost:3000/hw/store/catalog')
    expect(await res.statusText() !== '404').toBeTruthy()
  });
  it('Доступен путь условий доставки', async function () {
    const [page] = await (await this.browser.getPuppeteer()).pages()
    const res = await page.goto('http://localhost:3000/hw/store/delivery')
    expect(await res.statusText() !== '404').toBeTruthy()
  });
  it('Доступен путь контактов', async function () {
    const [page] = await (await this.browser.getPuppeteer()).pages()
    const res = await page.goto('http://localhost:3000/hw/store/contacts')
    expect(await res.statusText() !== '404').toBeTruthy()
  });
  it('Доступен путь корзины', async function () {
    const [page] = await (await this.browser.getPuppeteer()).pages()
    const res = await page.goto('http://localhost:3000/hw/store/cart')
    expect(await res.statusText() !== '404').toBeTruthy()
  });
})