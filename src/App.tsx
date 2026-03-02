import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Nav, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Lesson {
  id: number;
  subject: string;
  teacher: string;
  class_level: string;
  scheduled_hours: number;
}
function App() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonForm, setLessonForm] = useState({
    subject: "",
    teacher: "",
    class_level: "",
    scheduled_hours: 0,
  });

  const fetchLessons = async () => {
    try {
      const res = await fetch("http://localhost:3000/lessons");
      const data = await res.json();
      setLessons(data);
    } catch (error) {
      alert("Szerver hiba: " + error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: lessonForm.subject,
          teacher: lessonForm.teacher,
          class_level: lessonForm.class_level,
          scheduled_hours: lessonForm.scheduled_hours,
        }),
      });

      if (!res.ok) {
        alert("Hiba történt a tanóra felvétele közben");
      } else {
        setLessonForm({
          subject: "",
          teacher: "",
          class_level: "",
          scheduled_hours: 0,
        });
        fetchLessons();
      }
    } catch (error) {
      alert("Szerver hiba: " + error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <>
      <header>
        <h1>Tanórák</h1>
        <Nav>
          <Nav.Link href="https://petrik.hu/" target="_blank">
            Petrik weboldal
          </Nav.Link>
          <Nav.Link href="#new">Új tanóra felvétele</Nav.Link>
        </Nav>
      </header>
      <main>
        <section className="container-fluid">
          <Row xs={1} md={2} xl={4}>
            {lessons.map((lesson, id) => (
              <Card key={id} className=" mb-2">
                <Card.Body>
                  <Col>
                    <table>
                      <tbody>
                        <tr>
                          <td><h2>{lesson.subject}</h2></td>
                          <td>{lesson.class_level}</td>
                          <td>{lesson.teacher}</td>
                          <td>{lesson.scheduled_hours} perc</td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Card.Body>
                <Button>Megtartva</Button>
              </Card>
            ))}
          </Row>
        </section>
        <br />
        <section className="container-fluid" id="new">
          <Row xs={1} md={2} xl={3}>
            <Form onSubmit={() => handleSubmit}>
              <Form.Group>
                <Form.Label>Tantárgy:</Form.Label>
                <Form.Control
                  value={lessonForm.subject}
                  type="text"
                  onChange={(e) => {
                    setLessonForm({ ...lessonForm, subject: e.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tanár:</Form.Label>
                <Form.Control
                  value={lessonForm.teacher}
                  type="text"
                  onChange={(e) => {
                    setLessonForm({ ...lessonForm, teacher: e.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Osztály:</Form.Label>
                <Form.Control
                  value={lessonForm.class_level}
                  type="text"
                  onChange={(e) => {
                    setLessonForm({
                      ...lessonForm,
                      class_level: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tanóra hossza:</Form.Label>
                <Form.Control
                  value={lessonForm.scheduled_hours}
                  type="number"
                  onChange={(e) => {
                    setLessonForm({
                      ...lessonForm,
                      scheduled_hours: parseFloat(e.target.value),
                    });
                  }}
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Button type="submit">Új tanóra felvétele</Button>
              </Form.Group>
            </Form>
          </Row>
        </section>
      </main>
      <br />
      <footer>
        <p>
          <b>Oldalt készítette: </b>Yamakawa Kende <br />
          <i>Oldal készült: </i>2026.03.02
        </p>
      </footer>
    </>
  );
}

export default App;
