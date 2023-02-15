import fs from "fs"
import path from "path"

let storePath = String.raw`${path.join(process.cwd(), "contractParameter")}`
export const readJSONFile = async (fileName: string): Promise<object> => {
  try {
    console.log("storePath", storePath)
    const data = await fs.promises.readFile(`${storePath}/${fileName}`, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const writeJSONFile = async (fileName: string, data: object) => {
  try {
    await fs.promises.writeFile(`${storePath}/${fileName}`, JSON.stringify(data))
    console.log(`Data written to file "${fileName}" successfully!`)

    const storedData = await fs.promises.readFile(`${storePath}/${fileName}`, "utf-8")
    return JSON.parse(storedData)
  } catch (error) {
    console.error(error)
  }
}
