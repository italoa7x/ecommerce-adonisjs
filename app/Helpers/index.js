"use strict"
const crypto = use("crypto")
const Helpers = use("Helpers")

/**
 * Generate random string
 * @param { id } - tamanho da string que deseja gerar
 * @returns { string } retorna um string randomica do tamanho passado
 */

const str_random = async (length = 40) => {
  let string = ""
  let len = string.length

  if (len < length) {
    let size = length - len
    let bytes = await crypto.randomBytes(size)
    let buffer = Buffer.from(bytes)
    string += buffer
      .toString("base64")
      .replace(/[^a-zA-Z0-9]/g, "")
      .substr(0, size)
  }
  return string
}

/**
 *  Move um único arquivo para o caminho específico, se não for passado nenhum caminho
 *  o 'public/uploads' será utilizado
 * @param { FileJar } file - arquivo a ser gerenciado
 * @param { string } path - caminho para onde mover o arquivo
 * @returns { Object<FileJar> }
 */
const managerSingleUpload = async (file, path = null) => {
  path = path ? path : Helpers.publicPath("uploads")
  //  gera um nome aleatório
  const random_name = await str_random(30)

  let fileName = `${new Date().getTime}-${random_name}.${file.subtype}`

  // renomeia o arquivo e move para o path
  await file.move(path, {
    name: fileName,
  })

  return file
}

/**
 *  Move múltiplos arquivos
 * @param { FileJar } files - arquivos que serão movidos
 * @param { string } path - path
 * @returns { Object  }
 */
const managerMultipleUploads = async (fileJar, path = null) => {
  path = path ? path : Helpers.publicPath("uploads")
  let successes = []
  let errors = []

  await Promise.all(
    fileJar.map(async file => {
      let random_name = await str_random(30)
      let fileName = `${new Date().getTime}-${random_name}.${file.subtype}`
      // move o arquivo
      await file.move(path, {
        name: fileName,
      })
      // verifica se movel o arquivo
      if (file.moved()) {
        successes.push(file)
      } else {
        errors.push(file.error())
      }
    })
  )
  return { successes, errors }
}

module.exports = { str_random, managerSingleUpload, manageMultipleUploads }
