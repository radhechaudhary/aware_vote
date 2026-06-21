const query = () => {
    return (
        async (req, res) => {
            try {
                const { query } = req.body;
                console.log(query)

            } catch (error) {
                console.log("Error in chatbot query", error);
                return res.status(500).json({ message: "Internal server error" })
            }
        }
    )
}

export { query }