input.onButtonPressed(Button.A, function () {
    if (!(input.buttonIsPressed(Button.AB))) {
        if (dataMode == 1) {
            dataMode = 0
        } else {
            dataMode = 1
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (!(input.buttonIsPressed(Button.AB))) {
        if (CurMode == 6) {
            music.play(music.createSoundExpression(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
            CurMode = 1
            hasShownString = 0
        } else {
            music.play(music.createSoundExpression(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
            CurMode += 1
            hasShownString = 0
        }
    }
})
let a = 0
let reading = 0
let dataMode = 0
let hasShownString = 0
let CurMode = 0
basic.showLeds(`
    . . . . .
    . . . . .
    # . # . #
    . . . . .
    . . . . .
    `)
radio.setGroup(255)
CurMode = 1
hasShownString = 0
dataMode = 0
music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.UntilDone)
basic.clearScreen()
basic.forever(function () {
    if (CurMode == 1) {
        if (dataMode == 1) {
            if (hasShownString == 0) {
                basic.clearScreen()
                basic.pause(200)
                basic.showLeds(`
                    . . # . .
                    . # # # .
                    # # # # #
                    # # # # #
                    . # # # .
                    `)
                hasShownString = 1
            }
            radio.sendString("Plant Humidity")
            pins.digitalWritePin(DigitalPin.P0, 1)
            basic.pause(1)
            reading = pins.analogReadPin(AnalogPin.P0)
            pins.digitalWritePin(DigitalPin.P0, 0)
            led.plotBarGraph(
            reading,
            910
            )
            if (input.buttonIsPressed(Button.AB)) {
                basic.clearScreen()
                basic.pause(200)
                basic.showLeds(`
                    . . # . .
                    . # # # .
                    # # # # #
                    # # # # #
                    . # # # .
                    `)
                basic.showString(" " + reading + "/800")
            }
        } else {
            if (reading < 800) {
                basic.showIcon(IconNames.Asleep)
            } else {
                basic.showIcon(IconNames.Happy)
            }
            pins.digitalWritePin(DigitalPin.P0, 1)
            reading = pins.analogReadPin(AnalogPin.P0)
            pins.digitalWritePin(DigitalPin.P0, 0)
            if (input.buttonIsPressed(Button.AB)) {
                basic.clearScreen()
                basic.pause(200)
                basic.showLeds(`
                    . . # . .
                    . # # # .
                    # # # # #
                    # # # # #
                    . # # # .
                    `)
                basic.showString(" " + reading + "/800")
            }
            basic.pause(1)
        }
    } else if (CurMode == 2) {
        if (dataMode == 1) {
            if (hasShownString == 0) {
                basic.clearScreen()
                basic.showLeds(`
                    # . # . #
                    . # # # .
                    # # # # #
                    . # # # .
                    # . # . #
                    `)
                basic.pause(200)
                hasShownString = 1
            }
            radio.sendString("Temperature")
            led.plotBarGraph(
            input.temperature(),
            28
            )
            if (input.buttonIsPressed(Button.AB)) {
                basic.clearScreen()
                basic.showLeds(`
                    # . # . #
                    . # # # .
                    # # # # #
                    . # # # .
                    # . # . #
                    `)
                basic.pause(200)
                basic.showString(" " + input.temperature() + "/ 25 C")
            }
            basic.pause(1)
        } else {
            a = input.temperature()
            if (hasShownString == 0) {
                basic.clearScreen()
                basic.showLeds(`
                    # . # . #
                    . # # # .
                    # # # # #
                    . # # # .
                    # . # . #
                    `)
                basic.pause(200)
                hasShownString = 1
            }
            if (input.temperature() < 18) {
                basic.showIcon(IconNames.Confused)
            } else {
                basic.showIcon(IconNames.Happy)
            }
            if (input.buttonIsPressed(Button.AB)) {
                basic.clearScreen()
                basic.showLeds(`
                    # . # . #
                    . # # # .
                    # # # # #
                    . # # # .
                    # . # . #
                    `)
                basic.pause(200)
                basic.showString(" " + input.temperature() + "/ 25 C")
            }
            basic.pause(1)
        }
    } else if (CurMode == 3) {
        if (dataMode == 1) {
            if (hasShownString == 0) {
                basic.clearScreen()
                basic.showLeds(`
                    . . . . .
                    . # # # .
                    . # . # .
                    . # # # .
                    . . . . .
                    `)
                basic.pause(200)
                hasShownString = 1
            }
            radio.sendString("Light Level")
            led.plotBarGraph(
            input.lightLevel(),
            295
            )
            if (input.buttonIsPressed(Button.AB)) {
                basic.clearScreen()
                basic.showLeds(`
                    . . . . .
                    . # # # .
                    . # . # .
                    . # # # .
                    . . . . .
                    `)
                basic.pause(200)
                basic.showString(" " + input.lightLevel() + "/ 255")
            }
            basic.pause(1)
        } else {
            if (hasShownString == 0) {
                basic.clearScreen()
                basic.showLeds(`
                    . . . . .
                    . # # # .
                    . # . # .
                    . # # # .
                    . . . . .
                    `)
                basic.pause(200)
                hasShownString = 1
            }
            led.plotBarGraph(
            input.lightLevel(),
            295
            )
            if (input.buttonIsPressed(Button.AB)) {
                basic.clearScreen()
                basic.showLeds(`
                    . . . . .
                    . # # # .
                    . # . # .
                    . # # # .
                    . . . . .
                    `)
                basic.pause(200)
                basic.showString(" " + input.lightLevel() + "/ 255")
            }
            basic.pause(1)
        }
    } else if (CurMode == 4) {
        radio.sendString("Noise")
        if (hasShownString == 0) {
            basic.clearScreen()
            basic.showIcon(IconNames.EighthNote)
            basic.pause(200)
            hasShownString = 1
        }
        if (hasShownString == 0) {
            basic.clearScreen()
            basic.showIcon(IconNames.EighthNote)
            basic.pause(200)
            hasShownString = 1
        }
        led.plotBarGraph(
        input.soundLevel(),
        295
        )
    } else if (CurMode == 5) {
        radio.sendString("Speed")
        led.plotBarGraph(
        input.acceleration(Dimension.X),
        1000
        )
        basic.pause(1)
    } else if (CurMode == 6) {
        radio.sendString("Off")
        basic.clearScreen()
        basic.pause(1)
    }
})
