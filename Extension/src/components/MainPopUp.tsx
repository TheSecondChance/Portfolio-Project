import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Custom.module.css";
import SelectLanguage from "./SelectLanguage";

interface User {
  id: number;
  username: string;
  categories: number[];
}

interface Category {
  id: number;
  category: string;
}

const MainPopUp = () => {
  const [user, setUser] = useState<User | null>(null);
  const [listCategory, setListCategory] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [submissionMessage, setSubmissionMessage] =
    useState<React.ReactNode>(null);
  const [interval, setInterval] = useState<number | null>(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<string | null>(null);
  const [close, setClose] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/get-csrf-token/")
      .then((response) => {
        setCsrfToken(response.data.csrfToken);

        return axios.get("http://127.0.0.1:8000/users/2", {
          headers: {
            "X-CSRFToken": response.data.csrfToken,
          },
        });
      })
      .then((res) => {
        setUser(res.data);
        setSelectedCategories(res.data.categories);

        return axios.get("http://127.0.0.1:8000/only-category/");
      })
      .then((res) => {
        setListCategory(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    if (selected && selectedInterval !== null) {
      setClose("You can close the extension it will reminde you set of time");
    } else {
      setClose("");
    }
  }, [selected, selectedInterval]);

  const handleCheckboxChange = (categoryId: number) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const message = <SelectLanguage />;

    if (user) {
      const updatedUser = { ...user, categories: selectedCategories };

      setUser(updatedUser);
      axios
        .patch(
          `http://127.0.0.1:8000/users/2/`,
          {
            categories: selectedCategories,
          },
          {
            headers: {
              "X-CSRFToken": csrfToken,
            },
          }
        )
        .then(() => {
          setSelected("Aded👍");
        })
        .catch((err) => {
          setSubmissionMessage(message);
          setUser(user);
          console.log(err.message);
        });
    }
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterval(Number(event.target.value));
  };

  const handleIntervalSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    chrome.runtime.sendMessage({
      type: "setAlarmInterval",
      interval: interval !== null ? interval : 0,
    });
    setSelectedInterval("Aded👍");
  };

  if (submissionMessage) {
    return <div>{submissionMessage}</div>;
  }

  return (
    <>
      <div style={{ width: "24rem", height: "30rem" }}>
        <div className={styles.cardBody}>
          <h2 className={styles.headerFont}>
            Hassle-free <span className={styles.headColor}>Reminder</span>
          </h2>
          <hr />
          <p className="card-text">Select your language and setup your time</p>
          <form onSubmit={submit}>
            {listCategory.map((category) => (
              <div
                className={[styles.fspace, styles.leftPadding].join(" ")}
                key={category.id}
              >
                <label htmlFor={`flexCheckDefault-${category.id}`}>
                  <input
                    className={["form-check-input"].join(" ")}
                    type="checkbox"
                    id={`flexCheckDefault-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCheckboxChange(category.id)}
                  />
                  {"  "}
                  {category.category}
                </label>
              </div>
            ))}

            <div className={styles.btnCenter}>
              <button
                type="submit"
                className={[styles.btnColor, styles.btnHover].join(" ")}
              >
                Add Language
              </button>
              {"  "}
              {selected}
            </div>
          </form>
          <hr />
          <form onSubmit={handleIntervalSubmit}>
            <div className={[styles.interval, styles.btnCenter].join(" ")}>
              <div>
                <label htmlFor="intervalInput">
                  Set Interval (in minutes):
                </label>
                <input
                  type="number"
                  id="intervalInput"
                  value={interval !== null ? interval : ""}
                  onChange={handleIntervalChange}
                  min="0"
                  placeholder="Enter minutes"
                />
              </div>
              <div className={styles.btnCenter}>
                <button
                  type="submit"
                  className={[
                    styles.btnColor,
                    styles.btnHover,
                    styles.btnInterval,
                  ].join(" ")}
                >
                  Set Interval
                </button>
                {"  "}
                {selectedInterval}
              </div>
            </div>
          </form>
          {close && <p className={styles.closeColor}>{close}</p>}
        </div>
      </div>
    </>
  );
};

export default MainPopUp;
