export default interface iFileState {
  loading: boolean,
  uploadModal: boolean,
  fileName: string,
  excelData: any[],
  countryModal: boolean,
  fileModal: boolean

  // Starting from Here temp simulation only
  datas: any[]
  countries: string[]
}