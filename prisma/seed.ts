import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const videos = [
    { 
      title: "Cómo empezar tu discurso con fuerza", 
      duration: "8 min", 
      type: "Video",
      url: "https://www.youtube.com/watch?v=example1", // Placeholder, user to update
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3TLtHsmNO3kXtXHCyQqPcznWXCuOo6Au0eGIInmXT6H7pOk76MKMSIRZYPUn8sWwx9WEPYrdjBTMOle-4tPiTcROHR9sxSyp93G0Rn5lWPaQMX444dZiNDaaFAVCRjvY3GiruOxvGYtggZEB3GdFIleU0xXZA5D-DGywof2kTa-SYUmvJ79zqkbQn6Grpiq81GmwNL8O1RHlDTXtaZy2MWLQxdjElvYCWN7n0fxqyNcgnCsEidTSMkaBYN7iRpl_RP_hO03GeYm4"
    },
    { 
      title: "Visualización positiva guiada", 
      duration: "10 min", 
      type: "Ejercicio",
      url: "https://www.youtube.com/watch?v=example2",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuQfIIoeoLvOSw4DV5ghb5BrMaceesaXSRYrChpEvnBs603PZWGfC2tBOdwFSoOupbOgoqbUvKDxG2Q8plTd9XsPE6wYHKMjzBu9BmiC08BW15fSgOc0GsVkSlGajROqLKBX0WwTqTrIQX_larFep_JI2s4kI-OEcsLMQq4ZNYxrrW3_hFS-wSmfUPI8Kucxiy3vqHPbC5-iwLNIVZ4nI9HiRj4vyUEQtfQQszdf4QqaLIO1xIBZKNNut5TKp-MvkQU4UEPXhdlQ0"
    },
    { 
      title: "10 trucos mentales", 
      duration: "4 min", 
      type: "Lectura",
      url: "https://example.com/article",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAr-m2KBkwZJRhvDcQKwzeiK8vxz8rNKqpszRX34_i1jEyaViry4pPGEbiP8iWVjkkxR6TtVzwZNmjsDwG5ZynLhTOKLMhs5if0SrOnVP95E_lMu8Wuq-i5xIN4yhgQp4VZkALOEphX69ht-CRN5JHJidBWt3lTMFcafN6gA2aFlW16txjyffXFWbutllPyCFXIK2QcnSN4qndroNA3uclWFf1KVK6Cf1NovI2ZbmxOKXRvyPPdFbtUrQwUZLTkUZGjHF0GZsJe7gU"
    }
]

const books = [
    { title: "Estructura del discurso persuasivo", author: "Aprende el método AIDA", type: "Guía", duration: "6 min", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdHJli-Rkh6lBVMnV4HDjB2RvPZN9kXoLMMP1cdpFLl5mev1kTVlw0a_MsLDwaRSEckF9S8CEOoyyAleChZHtHfPjEv3nYR0PGmHmzHS3kAhcSqP56a35aa_jzj-_ITIs5wW5QswnfHXVJ5bG7Xz5xxXYnrRZMG6JdMsAk2WmsOD9sSRN4acIvA9k41FR61bx9DdMbDEP96YmXg4Eq3x25LGAymljUInY0I89KqxZWRW1CKdWf245jFHUD1yzVWCoVPzL6sI9435w" },
    { title: "Lenguaje corporal efectivo", author: "Qué hacer con tus manos", type: "Video", duration: "4:30 min", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuArYOsgceXGSwG6Z5Slw4Q32MGKmp2h1-UyfJZKd5Kcv53HItwqr2W5VXPvm3ul-trQHZTARbFEoUxmYqoHaEzr6gcEtPFPPPcPPMe0XaYCUDyO9ORebATQAN1LmlGvYbqUk7aOTLUUKVx7lPpnHwCYwbI5umHHsYnn_l6L7B6nUmnftmtyIHB25MnDdVUQPHKzaL8h8Z68TYrOj3zv_ory0WRVZIjow_n5QEpoyUTbYp1MpacARjmEn-Pm09T-gnDZ5mctnpxxyoI" },
    { title: "Ejercicios de Dicción", author: "Trabalenguas para pronunciación", type: "Práctica", duration: "3 ejercicios", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuATiQg61XgmAcXvNJAxKV_HfKedgA5Z5_0vuKNzT4nvm6cMGgoxSI3Xf0yz9qUk7cBAqMGb-9UYgbrjIMk9rfy8pkL6OPW8K_xpD9KjcMYmlz4jc_za1voXegtq7qTQfuM7Hs2V9gfIZZ5CwKLOYOPVSF1jpHjDepBSXbpdgq64dYRCLy7SQqo6kiOxGIhuiDHkp1PuDrwRAjiXtvN3QQs76QinRal_zDSFcqltmiLCMNZkoRAjrA3lESVR30qtWEU9jY6nN9UGKOY" }
]

async function main() {
  console.log('Seeding database...')

  for (const video of videos) {
    const exists = await prisma.resource.findFirst({ where: { title: video.title } })
    if (!exists) {
      await prisma.resource.create({
        data: {
          title: video.title,
          description: "Contenido recomendado",
          type: "VIDEO",
          url: video.url,
          imageUrl: video.imageUrl,
          duration: video.duration,
        }
      })
      console.log(`Created video: ${video.title}`)
    }
  }

  for (const book of books) {
    const exists = await prisma.resource.findFirst({ where: { title: book.title } })
    if (!exists) {
      await prisma.resource.create({
        data: {
          title: book.title,
          description: `Autor: ${book.author}`,
          type: "BOOK",
          url: "https://amazon.com/example", // Placeholder
          imageUrl: book.imageUrl,
          duration: book.duration,
          author: book.author
        }
      })
      console.log(`Created book: ${book.title}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
