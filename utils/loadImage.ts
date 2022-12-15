export const loadImage = ({
  setDimensions,
  imgURL,
}: {
  setDimensions: (dimensions: any) => void
  imgURL: string
}) => {
  const img = new Image()
  img.src = imgURL
  img.onload = () => {
    const aspectRatio =
      img.width >= img.height
        ? Math.round((img.width / img.height + Number.EPSILON) * 100) / 100 +
          ":1"
        : "1:" +
          Math.round((img.height / img.width + Number.EPSILON) * 100) / 100

    const n1 = aspectRatio.substring(0, aspectRatio.indexOf(":"))
    const n2 = aspectRatio.substring(
      aspectRatio.indexOf(":") + 1,
      aspectRatio.length
    )
    const valid =
      parseFloat(n1) === 1 ? parseFloat(n2) < 1.25 : parseFloat(n1) < 1.91

    setDimensions({
      width: img.width,
      height: img.height,
      aspectRatio,
      valid,
    })
    console.log(img.width, img.height)
  }
  img.onerror = (err: any) => {
    console.log("img error")
    console.log(err)
  }
}