import React, { Component } from 'react';
import { SafeAreaView, View, Text, ListView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* import styles */
import styles from './HomeView.styles';

/* import styles and functions */
import { AllTexts, colors } from '../../theme/css/Common';
import * as CommonFunctions from '../../theme/js/CommonFunctions';

/* import external modules */
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';

/* API calls */
import * as NewsAuthAPI from '../../../services/newsAuthAPI';

class HomeView extends Component {
  static propTypes = {
    // dispatch is automatically provided by react-redux, and is used to
    // interact with the store.
    dispatch: PropTypes.func.isRequired,
  };
  static navigationOptions = ({ navigation }) => ({
    title: AllTexts.HomeViewTitle,
    gesturesEnabled: false
  });

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: this._rowHasChanged.bind(this),
      }),
      isLoadMore: false
    };
  }

  componentWillMount() {
    // Initial fetch for data, assuming that listData is not yet populated.
    this._loadMoreContentAsync();
  }

  componentDidMount() {
    this.setState({ isLoadMore: false });
    // Update the data store with initial data.
    if (CommonFunctions.isJson(this.props.newsArticles)) {
      let articles = JSON.parse(this.props.newsArticles).value;
      console.log('componentDidMount (articles)', articles);
      this.state.dataSource = this.getUpdatedDataSource(articles);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps ');
    // Trigger a re-render when receiving new props (when redux has more data).
    if (nextProps.newsArticles !== this.props.newsArticles) {
      if (CommonFunctions.isJson(nextProps.newsArticles)) {
        let articles = JSON.parse(nextProps.newsArticles).value;
        console.log('componentWillReceiveProps (articles)', articles);
        this.setState({
          dataSource: this.getUpdatedDataSource(articles),
          isLoadMore: false
        });
      }
    }

  }

  getUpdatedDataSource(props) {
    console.log('== getUpdatedDataSource == (props)', props);
    let rows = props;

    let ids = rows.map((obj, index) => index);

    return this.state.dataSource.cloneWithRows(rows, ids);
  }

  _rowHasChanged(r1, r2) {
    return JSON.stringify(r1) !== JSON.stringify(r2);
  }

  _renderRefreshControl() {
    console.log(' _renderRefreshControl here');
    // Reload all data
    return (
      <RefreshControl
        refreshing={this.state.isLoadMore}
        onRefresh={this._loadMoreContentAsync.bind(this)}
      />
    );
  }

  _loadMoreContentAsync = async () => {
    console.log(' _loadMoreContentAsync ');
    this.setState({ isLoadMore: true });
    this.props.dispatch(NewsAuthAPI.onAsyncGetTopHeadlines());
    this.setState({ isLoadMore: false });
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <View style={{ justifyContent: 'flex-start', width: '100%', height: '90%' }}>
          <ListView
            renderScrollComponent={props => <InfiniteScrollView {...props} />}
            distanceToLoadMore={5}
            dataSource={this.state.dataSource}
            renderRow={(rowData, rowID) => (
              <View key={Math.random() + rowID} style={styles.articleListView}>
                <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                  {/* <Image style={styles.articleListImage} source={{}} /> */}
                  <Image
                    source={{ uri: rowData.urlToImage }}
                    indicator={ProgressCircle}
                    style={styles.articleListImage} />
                </View>
                <View style={{ width: '75%', alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text style={styles.listItemTitleText}>{rowData.title}</Text>
                </View>
              </View>
            )}
            refreshControl={this._renderRefreshControl()}
            canLoadMore={!!this.props.newsArticles}
            onLoadMoreAsync={this._loadMoreContentAsync.bind(this)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect()(HomeView);