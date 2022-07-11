// @ts-ignore
import file_1 from '../../files/1.docx';

function SellBook() {
  return (
    <div className="container-fluid">
      <h1>Книга продаж</h1>
      <ul><a href={file_1} download style={{ textDecoration: 'none' }}>1. Правила продажи туров</a></ul>
    </div>
  );
}

export default SellBook;
