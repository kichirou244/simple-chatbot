class AiContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  async ask(model, question) {
    return this.strategy.ask(model, question);
  }
}
export default AiContext;
