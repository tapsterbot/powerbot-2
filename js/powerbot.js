var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  // Shield #1
  var motor1 = new five.Motor({
    pins: { pwm: 8, dir: 9, cdir: 10 },
      address: 0x60,
    controller: 'PCA9685'
  })

  var endstop = new five.Switch(13)

  endstop.on("open", function() {
    console.log("open")
  })

  endstop.on("close", function() {
    console.log("close")
    motor1.stop()
  })

  var counter = new five.Sensor.Digital(10)

  var count = 0
  counter.on("change", function(data) {
    count += 1
    console.log('Counter: ' + count)
  })

  function power(time = 150, speed=150) {
    motor1.fwd();
    setTimeout(function() { motor1.stop() }, time)
    setTimeout(function(speed) { motor1.rev(speed) }, time+10, speed)
    setTimeout(function() { if (motor1.isOn) {motor1.stop(); console.log("Failsafe: Stop") }}, time*2+50)
  }

  this.repl.inject({
    five: five,
    m1: motor1,
    endstop: endstop,
    count: count,
    counter: counter,
    power: power
  })

})
