def on_button_pressed_a():
    global dataMode
    if not (input.button_is_pressed(Button.AB)):
        if dataMode == 1:
            dataMode = 0
        else:
            dataMode = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global CurMode, hasShownString
    if not (input.button_is_pressed(Button.AB)):
        if CurMode == 6:
            music.play(music.create_sound_expression(WaveShape.SQUARE,
                    200,
                    1,
                    255,
                    0,
                    100,
                    SoundExpressionEffect.NONE,
                    InterpolationCurve.CURVE),
                music.PlaybackMode.IN_BACKGROUND)
            CurMode = 1
            hasShownString = 0
        else:
            music.play(music.create_sound_expression(WaveShape.SQUARE,
                    200,
                    1,
                    255,
                    0,
                    100,
                    SoundExpressionEffect.NONE,
                    InterpolationCurve.CURVE),
                music.PlaybackMode.IN_BACKGROUND)
            CurMode += 1
            hasShownString = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

a = 0
reading = 0
dataMode = 0
hasShownString = 0
CurMode = 0
basic.show_leds("""
    . . . . .
    . . . . .
    # . # . #
    . . . . .
    . . . . .
    """)
radio.set_group(255)
CurMode = 1
hasShownString = 0
dataMode = 0
music._play_default_background(music.built_in_playable_melody(Melodies.ENTERTAINER),
    music.PlaybackMode.UNTIL_DONE)
basic.clear_screen()

def on_forever():
    global hasShownString, reading, a
    if CurMode == 1:
        if dataMode == 1:
            if hasShownString == 0:
                basic.clear_screen()
                basic.pause(200)
                basic.show_leds("""
                    . . # . .
                    . # # # .
                    # # # # #
                    # # # # #
                    . # # # .
                    """)
                hasShownString = 1
            radio.send_string("Plant Humidity")
            pins.digital_write_pin(DigitalPin.P0, 1)
            basic.pause(1)
            reading = pins.analog_read_pin(AnalogPin.P0)
            pins.digital_write_pin(DigitalPin.P0, 0)
            led.plot_bar_graph(reading, 910)
            if input.button_is_pressed(Button.AB):
                basic.clear_screen()
                basic.pause(200)
                basic.show_leds("""
                    . . # . .
                    . # # # .
                    # # # # #
                    # # # # #
                    . # # # .
                    """)
                basic.show_string(" " + str(reading) + "/800")
        else:
            if reading < 800:
                basic.show_icon(IconNames.ASLEEP)
            else:
                basic.show_icon(IconNames.HAPPY)
            pins.digital_write_pin(DigitalPin.P0, 1)
            reading = pins.analog_read_pin(AnalogPin.P0)
            pins.digital_write_pin(DigitalPin.P0, 0)
            if input.button_is_pressed(Button.AB):
                basic.clear_screen()
                basic.pause(200)
                basic.show_leds("""
                    . . # . .
                    . # # # .
                    # # # # #
                    # # # # #
                    . # # # .
                    """)
                basic.show_string(" " + str(reading) + "/800")
            basic.pause(1)
    elif CurMode == 2:
        if dataMode == 1:
            if hasShownString == 0:
                basic.clear_screen()
                basic.show_leds("""
                    # . # . #
                    . # # # .
                    # # # # #
                    . # # # .
                    # . # . #
                    """)
                basic.pause(200)
                hasShownString = 1
            radio.send_string("Temperature")
            led.plot_bar_graph(input.temperature(), 28)
            if input.button_is_pressed(Button.AB):
                basic.clear_screen()
                basic.show_leds("""
                    # . # . #
                    . # # # .
                    # # # # #
                    . # # # .
                    # . # . #
                    """)
                basic.pause(200)
                basic.show_string(" " + str(input.temperature()) + "/ 25 C")
            basic.pause(1)
        else:
            a = input.temperature()
            if hasShownString == 0:
                basic.clear_screen()
                basic.show_leds("""
                    # . # . #
                    . # # # .
                    # # # # #
                    . # # # .
                    # . # . #
                    """)
                basic.pause(200)
                hasShownString = 1
            if input.temperature() < 18:
                basic.show_icon(IconNames.CONFUSED)
            else:
                basic.show_icon(IconNames.HAPPY)
            if input.button_is_pressed(Button.AB):
                basic.clear_screen()
                basic.show_leds("""
                    # . # . #
                    . # # # .
                    # # # # #
                    . # # # .
                    # . # . #
                    """)
                basic.pause(200)
                basic.show_string(" " + str(input.temperature()) + "/ 25 C")
            basic.pause(1)
    elif CurMode == 3:
        if dataMode == 1:
            if hasShownString == 0:
                basic.clear_screen()
                basic.show_leds("""
                    . . . . .
                    . # # # .
                    . # . # .
                    . # # # .
                    . . . . .
                    """)
                basic.pause(200)
                hasShownString = 1
            radio.send_string("Light Level")
            led.plot_bar_graph(input.light_level(), 295)
            if input.button_is_pressed(Button.AB):
                basic.clear_screen()
                basic.show_leds("""
                    . . . . .
                    . # # # .
                    . # . # .
                    . # # # .
                    . . . . .
                    """)
                basic.pause(200)
                basic.show_string(" " + str(input.light_level()) + "/ 255")
            basic.pause(1)
        else:
            if hasShownString == 0:
                basic.clear_screen()
                basic.show_leds("""
                    . . . . .
                    . # # # .
                    . # . # .
                    . # # # .
                    . . . . .
                    """)
                basic.pause(200)
                hasShownString = 1
            led.plot_bar_graph(input.light_level(), 295)
            if input.button_is_pressed(Button.AB):
                basic.clear_screen()
                basic.show_leds("""
                    . . . . .
                    . # # # .
                    . # . # .
                    . # # # .
                    . . . . .
                    """)
                basic.pause(200)
                basic.show_string(" " + str(input.light_level()) + "/ 255")
            basic.pause(1)
    elif CurMode == 4:
        radio.send_string("Noise")
        if hasShownString == 0:
            basic.clear_screen()
            basic.show_icon(IconNames.EIGHTH_NOTE)
            basic.pause(200)
            hasShownString = 1
        if hasShownString == 0:
            basic.clear_screen()
            basic.show_icon(IconNames.EIGHTH_NOTE)
            basic.pause(200)
            hasShownString = 1
        led.plot_bar_graph(input.sound_level(), 295)
    elif CurMode == 5:
        radio.send_string("Speed")
        led.plot_bar_graph(input.acceleration(Dimension.X), 1000)
        basic.pause(1)
    elif CurMode == 6:
        radio.send_string("Off")
        basic.clear_screen()
        basic.pause(1)
basic.forever(on_forever)
