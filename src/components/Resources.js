import React from "react";
import ResourceItem from "./ResourceItem";

class Resources extends React.Component {
  render() {
    const { resources, search, categories, sortFunction } = this.props;
    let query = search.toLowerCase();
    let sorted = resources
      .sort(sortFunction)
      .filter(
        ({ title, description }) =>
          title.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query)
      )
      .map((resourceInfo, index) => (
        <ResourceItem
          key={index}
          id={resourceInfo.id}
          title={resourceInfo.title}
          description={resourceInfo.description}
          url={resourceInfo.url}
          numberOfVotes={resourceInfo.num_of_votes}
          resourceType={resourceInfo.resource_type}
          categories={categories}
        />
      ));
    return <section className="resources">{sorted}</section>;
  }
}

export default Resources;
