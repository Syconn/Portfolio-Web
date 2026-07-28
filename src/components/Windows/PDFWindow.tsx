import Window, { type WindowInstance, type WindowManager } from "./Window"

function PDFWindow({ data, ...instance }: WindowInstance & WindowManager) {
    const filePath = data?.filePath;

    return (
        <Window {...instance} header={<PDFHeader />}>
            {filePath && <iframe src={filePath} className="pdf-viewer" title="PDF Viewer" />}
        </Window>
    );
}

function PDFHeader() {
    return (
        <span>PDF Viewer</span>
    )
}

export default PDFWindow