module.exports = (survey) => {
  return `
      <html>
         <body>
         <div style="text-align: center;">
         <h3>I'd like your input!</h3>
         <p>Please answer the following question:</p>
         <p>${survey.body}</p>
         <div>
         <a
         style="
           color: white;
           background: rgba(66, 127, 239, 0.827);
           border-color: rgba(38, 38, 221, 0.827);
           padding: 0.375rem 0.75rem;
           border-radius: 0.25rem;
           text-decoration: none;
           margin-right: 1rem;
         "
         href="https://damp-everglades-20250.herokuapp.com/api/surveys/${survey.id}/yes"
         >Yes</a
       >
       <a
         style="
           color: white;
           background: rgb(246, 92, 92);
           border-color: rgb(197, 59, 59);
           padding: 0.375rem 0.75rem;
           border-radius: 0.25rem;
           text-decoration: none;
         "
         href="https://damp-everglades-20250.herokuapp.com/api/surveys/${survey.id}/no"
         >No</a
       >
         </div>
         <p>Thanks!</p>
       </div>
         </body>
      </html>      
    `;
};
