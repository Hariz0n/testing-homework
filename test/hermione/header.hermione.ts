describe('Тестирование хедера', () => {
  it('Существуют ссылки при ширине больше либо равной 576', async function () {
    await this.browser.setWindowSize(1920, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await page.goto('http://localhost:3000/hw/store/')
    await this.browser.assertView('plain', 'div.navbar-nav');
  });
  it('Существуют ссылки при ширине меньше 576', async function() {
    await this.browser.setWindowSize(500, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await page.goto('http://localhost:3000/hw/store/')
    await page.click('button.navbar-toggler')
    await this.browser.pause(1000)
    await this.browser.assertView('plain', 'div.navbar-nav', {ignoreElements: ['button.navbar-toggler']});
  });
  it('Лого - это ссылка на главную', async function() {
    await this.browser.setWindowSize(575, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await page.goto('http://localhost:3000/hw/store/')
    const logoElement = await this.browser.$('#root > div > nav > div > a')
    expect([await logoElement.getTagName(), await logoElement.getAttribute('href')]).toStrictEqual(['a', '/hw/store/'])
  });
  it('Корректные ссылки навигации', async function () {
    await this.browser.setWindowSize(575, 1080)
    await this.browser.url('http://localhost:3000/hw/store/')
    const navElements = await this.browser.$$('.nav-link')
    expect(await Promise.all(navElements.map(async (link) => {
      return link.getAttribute('href')
    }))).toStrictEqual(['/hw/store/catalog', '/hw/store/delivery', '/hw/store/contacts', '/hw/store/cart'])
  });
  it('Бургер меню закрывается при выборе страницы', async function() {
    await this.browser.setWindowSize(570, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await page.goto('http://localhost:3000/hw/store/')
    const navList = await this.browser.$('.navbar-nav')
    await page.click('button.navbar-toggler')
    await page.click('.nav-link')
    expect(await navList.isDisplayed()).toBeFalsy()
  })
})