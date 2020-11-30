import React from 'react';

const Opinion = (props) => {

    function formatDate(date) {
        return (
            new Intl.DateTimeFormat("en-GB").format(Date.parse(date))
        )
    }

    const opinions = props.opinions;
    return (
        <div>
            {opinions.map(
                rating => (
                    <div key={rating.ratingId}>
                        <div className="ui container comments">
                            <div className="comment">
                                <div className="avatar">
                                    <h4>{rating.value}</h4>
                                </div>
                                <div className="content">
                                    <div className="author">
                                        {rating.user}
                                    </div>
                                    <div className="metadata">
                                        <span className="date"> {formatDate(rating.date)} </span>
                                    </div>
                                    <div className="text">
                                        {rating.message}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )

            )
            }
        </div>
    )
}
export default Opinion;