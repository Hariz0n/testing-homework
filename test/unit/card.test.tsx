import React from "react";
import {expect} from "@jest/globals";
import events from "@testing-library/user-event"
import MOCK_PRODUCTS from "./mock/products.mock";
import {getRenderedApp} from "./getRenderedApp";
import {Application} from "../../src/client/Application";

const randomId = Math.floor(Math.random() * 10 / 2.5)

describe('Тестирование информации карточки продукта', function () {
  it('Отображается название продукта', async function () {
    const { container, getAllByTestId } = getRenderedApp(<Application/>)
    const links = container.querySelector('.nav-link[href^="/catalog"]')
    await events.click(links)
    await new Promise(process.nextTick);
    const cards = getAllByTestId(1)
    expect(cards[1].querySelector('.card-title')).not.toBeNull()
  });
  it('Представлено верное название продукта', async function () {
    const { container, getAllByTestId } = getRenderedApp(<Application/>)
    const links = container.querySelector('.nav-link[href^="/catalog"]')
    await events.click(links)
    await new Promise(process.nextTick);
    const cards = getAllByTestId(randomId)
    expect(cards[1].querySelector('.card-title').textContent).toEqual(MOCK_PRODUCTS[randomId].name)
  });
  it('Отображается цена продукта', async function () {
    const { container, getAllByTestId } = getRenderedApp(<Application/>)
    const links = container.querySelector('.nav-link[href^="/catalog"]')
    await events.click(links)
    await new Promise(process.nextTick);
    const cards = getAllByTestId(randomId)
    expect(cards[1].querySelector('.card-text')).not.toBeNull()
  });
  it('Представлена верная цена продукта', async function () {
    const { container, getAllByTestId } = getRenderedApp(<Application/>)
    const links = container.querySelector('.nav-link[href^="/catalog"]')
    await events.click(links)
    await new Promise(process.nextTick);
    const cards = getAllByTestId(randomId)
    expect(cards[1].querySelector('.card-text').textContent).toEqual('$' + MOCK_PRODUCTS[randomId].price)
  });
  it('Отображается ссылка продукта', async function () {
    const { container, getAllByTestId } = getRenderedApp(<Application/>)
    const links = container.querySelector('.nav-link[href^="/catalog"]')
    await events.click(links)
    await new Promise(process.nextTick);
    const cards = getAllByTestId(randomId)
    expect(cards[1].querySelector('.card-link')).not.toBeNull()
  });
  it('Представлена верная ссылка продукта', async function () {
    const { container, getAllByTestId } = getRenderedApp(<Application/>)
    const links = container.querySelector('.nav-link[href^="/catalog"]')
    await events.click(links)
    await new Promise(process.nextTick);
    const cards = getAllByTestId(randomId)
    expect(cards[1].querySelector('.card-link').getAttribute('href')).toEqual(`/catalog/${MOCK_PRODUCTS[randomId].id}`)
  });
});