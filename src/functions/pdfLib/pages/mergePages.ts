import { PDFDocument } from "pdf-lib";

export async function margePages(pageBuffers: Uint8Array[]): Promise<Uint8Array> {
    //tworzymy pusty document
    const mergedPdf = await PDFDocument.create();

    //dla każdej strony w pageBuffers (np: [strona1, strona2])

    for( const buffer of pageBuffers ) {
        
        // ładujemy stronę jako osobny pdf
        const pdf = await PDFDocument.load(buffer);

        //Kopiujemy pierwszą stronę można i inne
        const [copiedPage] = await mergedPdf.copyPages(pdf, [0]); //tu mam od razu pierwszy element nazwany copiedPage
        mergedPdf.addPage(copiedPage)

    }

    return await mergedPdf.save()
}