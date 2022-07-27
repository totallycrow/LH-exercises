import Satellite from "./Satellite.js";

describe("Location", () => {
  const testSat = new Satellite({
    height: 120,
    coordinates: { x: "15.5", y: "100.55" },
  });

  test("New instance of Satellite is created", () => {
    expect(testSat instanceof Satellite).toBe(true);
  });

  test("Satellite's Solar Sails are turned on ", () => {
    testSat.setSolarSailStatus("on");
    expect(testSat.solarSailStatus).toBe("on");
  });

  test("Satellite's Solar Sails are turned off ", () => {
    testSat.setSolarSailStatus("off");
    expect(testSat.solarSailStatus).toBe("off");
  });

  test("Satellite's Signal Emitter is turned on ", () => {
    testSat.setSignalEmitterStatus("on");
    expect(testSat.signalEmitterStatus).toBe("on");
  });

  test("Satellite's Signal Emitter is turned off ", () => {
    testSat.setSignalEmitterStatus("off");
    expect(testSat.signalEmitterStatus).toBe("off");
  });

  test("Satellite is turned on", () => {
    testSat.setPoweredStatus("on");
    expect(testSat.poweredStatus).toBe("on");
  });

  test("Satellite is turned off", () => {
    testSat.setPoweredStatus("off");
    expect(testSat.poweredStatus).toBe("off");
  });
});
