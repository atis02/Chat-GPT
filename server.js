const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai')


const openai = new OpenAI({
    apiKey: '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',
})

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    const completion = await openai.completions.create({
        model: 'text-davinci-003',
        max_tokens: 512,
        temperature: 0,
        prompt: prompt,
    });
    res.send(completion.choices[0].text)
});

const PORT = 8020;

app.listen(PORT, () => console.log(`server is running on port : ${PORT}`))