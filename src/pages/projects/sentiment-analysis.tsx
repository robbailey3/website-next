import Container from '@/components/common/Container/Container';
import axios from 'axios';
import React from 'react';
import { distinctUntilChanged, Subject, throttleTime } from 'rxjs';

const SentimentAnalysisProjectPage = () => {
  const inputValue = new Subject<string>();

  const [analysis, setAnalysis] = React.useState(null);
  const [classify, setClassify] = React.useState(null);

  const handleKeyup = (e) => {
    inputValue.next(e.target.value);
  };

  const getAnalysis = async (val: string) => {
    if (val.split(' ').length > 5) {
      const response = await axios.post(
        '/api/projects/sentiment-analysis/analyse',
        {
          text: val,
        }
      );
      setAnalysis(response.data);
    }
  };

  const getClassification = async (val: string) => {
    if (val.split(' ').length > 5) {
      const response = await axios.post(
        '/api/projects/sentiment-analysis/classify',
        {
          text: val,
        }
      );
      setClassify(response.data);
    }
  };

  React.useEffect(() => {
    const subscription = inputValue
      .pipe(throttleTime(800), distinctUntilChanged())
      .subscribe((value: string) => {
        getAnalysis(value);
        getClassification(value);
      });

    return () => subscription.unsubscribe();
  });

  return (
    <Container>
      <section className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <h1 className="w-full text-4xl font-bold mb-4">Sentiment Analysis</h1>
          <p className="w-full text-xl">
            Sentiment analysis is a technique that uses the words in a text to
            determine whether the text is positive, negative, or neutral.
          </p>
          <div>
            <label htmlFor="text">Enter some text</label>
            <textarea
              name="text"
              id="text"
              cols={30}
              rows={10}
              onKeyUp={handleKeyup}
            ></textarea>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          {analysis && (
            <div>
              <pre>{JSON.stringify(analysis, null, 4)}</pre>
            </div>
          )}
          {classify && (
            <div>
              <pre>{JSON.stringify(classify, null, 4)}</pre>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
};

export default SentimentAnalysisProjectPage;
