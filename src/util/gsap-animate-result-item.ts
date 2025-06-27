import gsap from 'gsap'

const gsapAnimateResultItem = () => {
  const timeline = gsap.timeline()
  gsap.utils.toArray<Element>('.result-item').forEach((item, index) => {
    if (index === 0) {
      item.setAttribute('data-selected', 'true')
    }
    timeline.fromTo(
      item,
      {
        translateY: '100%',
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.6,
        translateY: '0%',
        ease: 'power4.out',
      },
      index * 0.08
    )
  })
}

export default gsapAnimateResultItem