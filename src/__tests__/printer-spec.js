const printResult = require('../printer').printResult
const path = require('path')

describe('#printResult', () => {
  it('should show the file path', () => {
    global.console = {log: jest.fn()}
    printResult({ file: path.resolve(__dirname, 'examples', 'example.scss'), line: 12 })

    expect(console.log).toBeCalled()
    expect(console.log.mock.calls[0][0]).toContain('examples/example.scss')
  })

  it('should show the line of file', () => {
    global.console = {log: jest.fn()}
    const line = 12
    printResult({ file: path.resolve(__dirname, 'examples', 'example.scss'), line: line })

    expect(console.log).toBeCalled()
    expect(console.log.mock.calls[0][0]).toContain(line)
  })

  it('should show the class', () => {
    global.console = {log: jest.fn()}
    printResult({ file: path.resolve(__dirname, 'examples', 'example.scss'), line: 12 })

    expect(console.log).toBeCalled()
    expect(console.log.mock.calls[0][0]).toContain('&--active {')
  })
})
