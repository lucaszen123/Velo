import { test, expect } from '../support/fixtures'

test.describe('Configuração do Veículo', () => {
  test.beforeEach(async ({ app }) => {
    await app.configurator.open()
  })

  
  test('deve atualizar preço apenas ao alterar rodas para Sport', async ({ app }) => {
    // Arrange
    await app.configurator.expectTotalPrice('R$ 40.000,00')

    // Act
    await app.configurator.selectColor('Midnight Black')

    // Assert
    await app.configurator.expectTotalPrice('R$ 40.000,00')
    await app.configurator.expectVehicleImage('/src/assets/midnight-black-aero-wheels.png')
  })


  test('deve atualizar o preço e a imagem ao alterar as rodas, restaurar os valores padrão', async ({ app }) => {
    // Arrange
    await app.configurator.expectTotalPrice('R$ 40.000,00')
    
    // Act
    await app.configurator.selectWheels(/Sport Wheels/)

    // Assert
    await app.configurator.expectTotalPrice('R$ 42.000,00')
    await app.configurator.expectVehicleImage('/src/assets/glacier-blue-sport-wheels.png')

    // Act
    await app.configurator.selectWheels(/Aero Wheels/)

    // Assert
    await app.configurator.expectTotalPrice('R$ 40.000,00')
    await app.configurator.expectVehicleImage('/src/assets/glacier-blue-aero-wheels.png')

  })
})

test.describe('CT03 - Configuração do Veículo (Adição de Opcionais) e Cálculo de Preço', () => {
  test.beforeEach(async ({ app }) => {
    await app.configurator.open()
    // Pré-condição: veículo sem opcionais selecionados, preço base R$ 40.000,00
    await app.configurator.expectTotalPrice('R$ 40.000,00')
  })

  test('deve atualizar o preço dinamicamente ao marcar e desmarcar opcionais e redirecionar para o checkout com os valores persistidos', async ({ app }) => {
    // Passo 1 - Marcar "Precision Park": preço acrescido de R$ 5.500,00 (total: R$ 45.500,00)
    await app.configurator.toggleOptional(/Precision Park/)
    await app.configurator.expectTotalPrice('R$ 45.500,00')

    // Passo 2 - Marcar "Flux Capacitor": preço acrescido de R$ 5.000,00 (total: R$ 50.500,00)
    await app.configurator.toggleOptional(/Flux Capacitor/)
    await app.configurator.expectTotalPrice('R$ 50.500,00')

    // Passo 3 - Desmarcar ambos os opcionais: preço retorna a R$ 40.000,00
    await app.configurator.toggleOptional(/Precision Park/)
    await app.configurator.toggleOptional(/Flux Capacitor/)
    await app.configurator.expectTotalPrice('R$ 40.000,00')

    // Passo 4 - Clicar em "Monte o Seu": redireciona para /order com os valores persistidos
    await app.configurator.clickCheckout()
    await app.order.expectRedirectedToOrder()
    await app.order.expectPaymentOption(/À Vista.*R\$ 40\.000,00/)
  })
})
