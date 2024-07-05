export const useV = () => {

  const toV = (px:number) => {
    return px * 100 / 1080 + "vw"
  }


  return {
      toV
  }
}