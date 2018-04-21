const getQueryFromArray = require('../getQueryFromArray')

describe('#getQueryFromArray', () => {
  let result

  it('should render simple query', () => {
    result = getQueryFromArray(['.box'])
    expect(result).toBe('.box')
  })

  it('should render query with child', () => {
    result = getQueryFromArray(['.box', '.title'])
    expect(result).toBe('.box .title')
  })

  it('should render child with "&" child', () => {
    result = getQueryFromArray(['.box', '&__title'])
    expect(result).toBe('.box__title')
  })

  it('should render child with ::after or ::before', () => {
    result = getQueryFromArray(['.box', '::before'])
    expect(result).toBe('.box::before')
  })

  it('should render child "more than >"', () => {
    result = getQueryFromArray(['.box', '> .description'])
    expect(result).toBe('.box > .description')
  })

  it('should render multiple inherit', () => {
    result = getQueryFromArray(['.box', '> .description', '#btn-change', '.btn-see-more'])
    expect(result).toBe('.box > .description #btn-change .btn-see-more')
  })

  it('should render with nth-child', () => {
    result = getQueryFromArray(['.box', ':nth-child(2)'])
    expect(result).toBe('.box:nth-child(2)')
  })
})
