"use strict"
const Image = use("App/Models/Image")
const { managerSingleUpload, managerMultipleUploads } = use("App/Helpers")
class ImageController {
  async index({ request, response, pagination }) {
    const images = await Image.query
      .orderBy("id", "DESC")
      .paginate(pagination.page, pagination.limit)

    return response.send(images)
  }

  async store({ request, response }) {
    try {
      // captura uma ou várias imagens da requisicao
      const fileJar = request.file("images", {
        types: ["image"],
        size: "2mb",
      })

      // retorno pro usuário
      let images = []

      // verifica se é um arquivo, se sim, chama o managerSingleUploads
      // caso contrário, chama o manageMultipleUploads
      if (!fileJar.files) {
        const file = await managerSingleUpload(fileJar)
        if (file.moved()) {
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype,
          })
          images.push(image)
          return response.status(201).send({
            successes: images,
            errors: {},
          })
        }
        return response.status(400).send({
          message: "Não foi possível processar esta imagem no momento!",
        })
      }

      let files = await managerMultipleUploads(fileJar)

      await Promise.all(
        files.successes.map(async file => {
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype,
          })
          images.push(image)
        })
      )
      return response.status(201).send({
        successes: images,
        errors: files.errors,
      })
    } catch (error) {
      return response.status(400).send({
        message: "Não foi possível processar a sua solicitação",
      })
    }
  }
}

module.exports = ImageController
