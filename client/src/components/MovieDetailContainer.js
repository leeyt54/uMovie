import React, { Component } from "react";
import { Container, Header, Divider } from "semantic-ui-react";
import MovieDetail from "./MovieDetail";
import VideoCarousel from "./VideoCarousel";
import MovieCarousel from "./MovieCarousel";
import axios from "axios";

class MovieDetailContainer extends Component {
  state = {
    loading: true,
    movie: {},
    videos: [],
    similarMovies: [],
    recommendedMovies: []
  };

  fetchData = async () => {
    const { id } = this.props.match.params;

    this.setState({ loading: true });

    const movie = await axios.get(`/movie/${id}`);
    const similarMovies = await axios.get(`/movie/${id}/similar`);
    const recommendedMovies = await axios.get(`/movie/${id}/recommendations`);
    const videos = await axios.get(`/movie/${id}/videos`);

    this.setState({
      loading: false,
      movie: movie.data,
      similarMovies: similarMovies.data.results,
      recommendedMovies: recommendedMovies.data.results,
      videos: videos.data.results
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { id } = this.props.match.params;

    if (id && id !== prevProps.match.params.id) {
      this.fetchData();
    }
  }

  render() {
    return (
      <Container style={{ marginBottom: "16px" }}>
        <MovieDetail movie={this.state.movie} loading={this.state.loading} />

        <Header as="h3">Videos</Header>
        <Divider />
        <VideoCarousel videos={this.state.videos} slides={2} />

        <Header as="h3">Similar Movies</Header>
        <Divider />
        <MovieCarousel movies={this.state.similarMovies} slides={6} />

        <Header as="h3">Recommended</Header>
        <Divider />
        <MovieCarousel movies={this.state.recommendedMovies} slides={6} />
      </Container>
    );
  }
}

export default MovieDetailContainer;
